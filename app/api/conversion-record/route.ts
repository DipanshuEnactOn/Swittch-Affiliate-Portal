import { createTranslation } from "@/i18n/server";
import {
  getClickByClickCode,
  markClickAsConverted,
} from "@/models/clicks-model";
import {
  getConversionByTransactionId,
  insertConversion,
  updateConversionStatus,
} from "@/models/conversions-model";
import { getCampaignById } from "@/models/campaigns-model";
import { getCampaignGoalById } from "@/models/campaign-goal-model";
import { commonResponse } from "@/utils/response-format";
import { NextRequest } from "next/server";
import { getAffiliateCampaignGoalById } from "@/models/affiliate-campaign-goal-model";
import { NewConversion, NewPostbackLog } from "@/db/schema";
import { getAffiliatePostbackByAffiliateAndCampaign } from "@/models/affiliate-postaback-model";
import { insertPostbackLog } from "@/models/postback-log-model";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();

  try {
    const body = await request.json();
    const {
      goal_id,
      campaign_id,
      click_code,
      extra,
      unique_id,
      transaction_id,
      secret,
      status,
    } = body;

    const forwarded = request.headers.get("x-forwarded-for");
    const clientIP = forwarded
      ? forwarded.split(",")[0]
      : request.ip || "unknown";

    let campaign = (await getCampaignById(1))?.data;
    let campaignGoal = (await getCampaignGoalById(1))?.data;
    let affiliateCampaignGoal = null;

    if (!click_code) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.clickCodeRequired"),
      });
    }

    const transactionIdToUse = transaction_id || unique_id;
    if (!transactionIdToUse) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.transactionIdRequired"),
      });
    }

    const clickRecord = (await getClickByClickCode(click_code))?.data;

    if (!clickRecord) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.invalidClickCode"),
      });
    }

    if (clickRecord.isConverted) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.clickAlreadyConverted"),
      });
    }

    if (goal_id) {
      const campaignGoalforId = await getCampaignGoalById(Number(goal_id));
      const affiliateCampaignGoalforId = await getAffiliateCampaignGoalById(
        Number(goal_id)
      );

      if (!campaignGoalforId && !affiliateCampaignGoalforId) {
        return commonResponse({
          data: null,
          status: "error",
          message: t("conversion.invalidGoalId"),
        });
      }

      campaignGoal = campaignGoalforId?.data;
      affiliateCampaignGoal = affiliateCampaignGoalforId?.data;
    }

    // if (campaign_id) {
    //   campaign = (await getCampaignById(Number(campaign_id)))?.data;
    //   if (!campaign) {
    //     return commonResponse({
    //       data: null,
    //       status: "error",
    //       message: t("conversion.invalidCampaignId"),
    //     });
    //   }
    // }

    const existingConversion = (
      await getConversionByTransactionId(transactionIdToUse)
    )?.data;

    if (existingConversion) {
      if (existingConversion.status === "pending") {
        const updateResult = await updateConversionStatus(
          existingConversion.id,
          status
        );

        if (updateResult.status === "error") {
          return commonResponse({
            data: null,
            status: "error",
            message: t("conversion.updateFailed"),
          });
        }

        await markClickAsConverted(clickRecord.clickCode);

        return commonResponse({
          data: updateResult.data,
          status: "success",
          message: t("conversion.statusUpdated"),
        });
      } else {
        return commonResponse({
          data: null,
          status: "error",
          message: t("conversion.conversionNotPending"),
        });
      }
    } else {
      let conversionValue = campaignGoal?.commissionAmount || " 0";
      let commission = campaignGoal?.commissionAmount || " 0";
      let postabackLogId = 0;

      if (affiliateCampaignGoal) {
        conversionValue = affiliateCampaignGoal.customCommissionRate || " 0";
        commission = affiliateCampaignGoal.customCommissionRate || " 0";
      }

      const affiliatePostback = (
        await getAffiliatePostbackByAffiliateAndCampaign(
          clickRecord.affiliateId,
          campaign_id ? Number(campaign_id) : 1,
          goal_id ? Number(goal_id) : 1
        )
      )?.data;

      if (affiliatePostback) {
        const data: NewPostbackLog = {
          rawPostbackData: affiliatePostback,
          transactionId: transactionIdToUse,
          status: status,
          statusMessages: null,
          receivedAt: new Date().toISOString(),
          processedAt: new Date().toISOString(),
        };

        const postback_log = (await insertPostbackLog(data))?.data;
        if (postback_log) {
          postabackLogId = postback_log.id;
        }
      }

      const newConversion: NewConversion = {
        campaignGoalId: goal_id ? Number(goal_id) : 1,
        campaignId: campaign_id ? Number(campaign_id) : 1,
        clickCode: clickRecord.clickCode,
        affiliateId: clickRecord.affiliateId,
        transactionId: transactionIdToUse,
        conversionValue,
        commission,
        status: status || "pending",
        postbackLogId: postabackLogId,
        createdAt: new Date(),
        updatedAt: new Date(),
        convertedAt: new Date().toISOString(),
      };

      const createResult = await insertConversion(newConversion);
      if (createResult.status === "error") {
        return commonResponse({
          data: null,
          status: "error",
          message: t("conversion.createFailed"),
        });
      }

      await markClickAsConverted(clickRecord.clickCode);

      return commonResponse({
        data: createResult.data,
        status: "success",
        message: t("conversion.conversionCreated"),
      });
    }
  } catch (error) {
    console.error("Conversion record API error:", error);
    return commonResponse({
      data: null,
      status: "error",
      message: t("conversion.invalidData"),
    });
  }
}
