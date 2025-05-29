import { createTranslation } from "@/i18n/server";
import {
  getAffiliatePostbackByAffiliateAndCampaign,
  insertAffiliatePostback,
} from "@/models/affiliate-postaback-model";
import { commonResponse } from "@/utils/response-format";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();
  try {
    const body = await request.json();

    const { affiliateId, campaignId, campaignGoalId, postbackUrl } = body;

    const existingAffiliatePostback =
      await getAffiliatePostbackByAffiliateAndCampaign(
        affiliateId,
        campaignId,
        campaignGoalId
      );

    if (existingAffiliatePostback.data) {
      return commonResponse({
        data: "",
        status: "error",
        message: t("postback.postbackAlreadyExists"),
      });
    }

    const data = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await insertAffiliatePostback(data);

    if (result.status === "error") {
      return commonResponse({
        data: result.data,
        status: "error",
        message: t("postback.errorCreatingPostback"),
      });
    }

    return commonResponse({
      data: result.data?.id,
      status: "success",
      message: t("postback.postbackCreated"),
    });
  } catch (error) {
    return commonResponse({
      data: error,
      status: "error",
      message: t("postback.invalidData"),
    });
  }
}
