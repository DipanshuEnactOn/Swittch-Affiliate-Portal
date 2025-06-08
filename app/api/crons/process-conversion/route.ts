import { Conversion, NewConversion } from "@/db/schema";
import { createTranslation } from "@/i18n/server";
import { getAffiliateCampaignGoalById } from "@/models/affiliate-campaign-goal-model";
import { getAffiliatePostbackByCampaignAndGoal } from "@/models/affiliate-postback-model";
import { getCampaignGoalById } from "@/models/campaign-goal-model";
import { getCampaignById } from "@/models/campaigns-model";
import {
  getClickByClickCode,
  markClickAsConverted,
} from "@/models/clicks-model";
import {
  getConversionByTransactionId,
  insertConversion,
  updateConversionStatus,
} from "@/models/conversions-model";
import {
  getPendingPostbackLogs,
  updatePostbackLogStatus,
} from "@/models/postback-log-model";
import { commonResponse } from "@/utils/response-format";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();

  try {
    const pendingPostbackLogs = await getPendingPostbackLogs();

    if (pendingPostbackLogs.status === "error" || !pendingPostbackLogs.data) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.failedToFetchPendingLogs"),
      });
    }

    const processedResults = [];
    const errors = [];

    for (const postbackLog of pendingPostbackLogs.data) {
      try {
        const body: any = postbackLog.rawPostbackData;
        const { goal_id, click_code, transaction_id, status } = body;

        console.log(
          `Processing postback log ID: ${postbackLog.id}, Transaction ID: ${transaction_id}`
        );

        const clickRecord = (await getClickByClickCode(click_code))?.data;

        if (!clickRecord) {
          await updatePostbackLogStatus(postbackLog.id, "failure", {
            error: t("conversion.invalidClickCode"),
          });
          errors.push({
            postbackLogId: postbackLog.id,
            error: t("conversion.invalidClickCode"),
            transactionId: transaction_id,
          });
          continue;
        }

        let campaign = (await getCampaignById(clickRecord.campaignId))?.data;
        let campaignGoal = (await getCampaignGoalById(goal_id))?.data;
        let affiliateCampaignGoal = null;

        if (!campaign || !campaignGoal) {
          await updatePostbackLogStatus(postbackLog.id, "failure", {
            error: t("conversion.invalidCampaignOrGoal"),
          });
          errors.push({
            postbackLogId: postbackLog.id,
            error: t("conversion.invalidCampaignOrGoal"),
            transactionId: transaction_id,
          });
          continue;
        }

        affiliateCampaignGoal = (
          await getAffiliateCampaignGoalById(Number(goal_id))
        )?.data;

        const existingConversion = (
          await getConversionByTransactionId(transaction_id)
        )?.data;

        if (existingConversion) {
          if (existingConversion.status === "pending") {
            const updateResult = await updateConversionStatus(
              existingConversion.id,
              status
            );

            if (updateResult.status === "error") {
              await updatePostbackLogStatus(postbackLog.id, "failure", {
                error: t("conversion.updateFailed"),
                transactionId: transaction_id,
              });
              errors.push({
                postbackLogId: postbackLog.id,
                error: t("conversion.updateFailed"),
                transactionId: transaction_id,
              });
              continue;
            }

            await updatePostbackLogStatus(postbackLog.id, "success", {
              transactionId: transaction_id,
            });
            processedResults.push({
              postbackLogId: postbackLog.id,
              conversionId: existingConversion.id,
              action: "updated",
              transactionId: transaction_id,
            });
          } else {
            await updatePostbackLogStatus(postbackLog.id, "failure", {
              error: t("conversion.conversionAlreadyExists"),
              transactionId: transaction_id,
            });
            errors.push({
              postbackLogId: postbackLog.id,
              error: t("conversion.conversionNotPending"),
              transactionId: transaction_id,
            });
            continue;
          }
        } else {
          let conversionValue = campaignGoal?.commissionAmount || "0";
          let commission = campaignGoal?.commissionAmount || "0";

          if (affiliateCampaignGoal) {
            conversionValue = affiliateCampaignGoal.customCommissionRate || "0";
            commission = affiliateCampaignGoal.customCommissionRate || "0";
          }

          const newConversion: NewConversion = {
            campaignGoalId: goal_id ? Number(goal_id) : 1,
            campaignId: clickRecord.campaignId
              ? Number(clickRecord.campaignId)
              : 1,
            clickCode: clickRecord.clickCode,
            affiliateId: clickRecord.affiliateId,
            transactionId: transaction_id,
            conversionValue,
            commission,
            sub1: clickRecord.sub1,
            sub2: clickRecord.sub2,
            sub3: clickRecord.sub3,
            status: status || "pending",
            postbackLogId: postbackLog.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            convertedAt: new Date(),
          };

          const createConversion = await insertConversion(newConversion);

          if (createConversion.status === "error") {
            await updatePostbackLogStatus(postbackLog.id, "failure");
            errors.push({
              postbackLogId: postbackLog.id,
              error: t("conversion.createFailed"),
              transactionId: transaction_id,
            });
            continue;
          }

          const conversionData: Conversion = createConversion.data;

          await markClickAsConverted(clickRecord.clickCode);

          const affiliatePostback = (
            await getAffiliatePostbackByCampaignAndGoal(
              clickRecord.affiliateId,
              clickRecord.campaignId ? Number(clickRecord.campaignId) : 1,
              goal_id ? Number(goal_id) : 1
            )
          )?.data;

          if (affiliatePostback && affiliatePostback.length > 0) {
            for (const postback of affiliatePostback) {
              const postbackData: any = {
                affiliate_id: clickRecord.affiliateId,
                campaign_id: clickRecord.campaignId
                  ? Number(clickRecord.campaignId)
                  : 1,
                campaign_goal_id: goal_id ? Number(goal_id) : 1,
                conversion_id: conversionData.id,
                conversion_value: conversionData.conversionValue,
                commission: conversionData.commission,
                sub1: conversionData.sub1,
                sub2: conversionData.sub2,
                sub3: conversionData.sub3,
                converted_at: conversionData.convertedAt,
                transaction_id: transaction_id,
                click_code: clickRecord.clickCode,
                status: status || "pending",
              };

              try {
                let finalUrl = postback.postbackUrl;

                for (const key in postbackData) {
                  const value = postbackData[key];
                  const macro = `{${key}}`;

                  finalUrl = finalUrl.replace(
                    new RegExp(macro, "g"),
                    encodeURIComponent(String(value))
                  );
                }

                const response = await fetch(finalUrl, {
                  method: postback.methodType || "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body:
                    postback.methodType === "GET"
                      ? undefined
                      : JSON.stringify(postbackData),
                });

                const data = await response.json();
                console.log(
                  `Postback sent successfully for conversion ID: ${conversionData.id}`,
                  data
                );
              } catch (error) {
                console.error(
                  `Postback error for conversion ID: ${conversionData.id}`,
                  error
                );
              }
            }
          }

          await updatePostbackLogStatus(postbackLog.id, "success", {
            transactionId: transaction_id,
          });
          processedResults.push({
            postbackLogId: postbackLog.id,
            conversionId: conversionData.id,
            action: "created",
            transactionId: transaction_id,
          });
        }
      } catch (error: any) {
        console.error(
          `Error processing postback log ID: ${postbackLog.id}`,
          error
        );
        await updatePostbackLogStatus(postbackLog.id, "failure", {
          error: error.message || "Unknown error",
          transactionId: postbackLog.transactionId,
        });
        errors.push({
          postbackLogId: postbackLog.id,
          error: error.message || "Unknown error",
          transactionId: postbackLog.transactionId,
        });
      }
    }

    const summary = {
      totalProcessed: pendingPostbackLogs.data.length,
      successful: processedResults.length,
      failed: errors.length,
      processedResults,
      errors,
    };

    console.log("Cron job processing summary:", summary);

    return commonResponse({
      data: summary,
      status: "success",
      message: `Processed ${summary.totalProcessed} postback logs. ${summary.successful} successful, ${summary.failed} failed.`,
    });
  } catch (error) {
    console.error("Cron job processing error:", error);
    return commonResponse({
      data: null,
      status: "error",
      message: t("conversion.cronJobFailed"),
    });
  }
}
