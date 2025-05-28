import { createTranslation } from "@/i18n/server";
import {
  getAffiliateLinkBySlug,
  insertAffiliateLink,
  updateAffiliateLink,
  updateAffiliateLinkStatus,
} from "@/models/affiliate-link-model";
import { updateAffiliate } from "@/models/affiliates-model";
import { commonResponse } from "@/utils/response-format";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();
  try {
    const body = await request.json();
    // await AffiliateLinkSchema.validate(body, {
    //   abortEarly: false,
    //   strict: true,
    // });

    const { id, status } = body;

    const result = await updateAffiliateLinkStatus(id, status);

    if (result.status === "error") {
      return commonResponse({
        data: result.data,
        status: "error",
        message: t("validation.errorCreatingLink"),
      });
    }

    return commonResponse({
      data: result.data?.id,
      status: "success",
      message: t("linkCreated"),
    });
  } catch (error) {
    return commonResponse({
      data: error,
      status: "error",
      message: t("validation.invalidData"),
    });
  }
}
