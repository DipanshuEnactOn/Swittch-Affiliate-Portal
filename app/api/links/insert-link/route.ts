import { createTranslation } from "@/i18n/server";
import {
  getAffiliateByEmail,
  insertAffiliate,
} from "@/models/affiliates-model";
import { commonResponse } from "@/utils/response-format";
import { AffiliateLinkSchema } from "@/utils/validation";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { create } from "node:domain";
import {
  getAffiliateLinkBySlug,
  insertAffiliateLink,
} from "@/models/affiliate-link-model";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();
  try {
    const body = await request.json();
    // await AffiliateLinkSchema.validate(body, {
    //   abortEarly: false,
    //   strict: true,
    // });

    const existingAffiliateLink = (await getAffiliateLinkBySlug(body.slug))
      ?.data;

    if (existingAffiliateLink) {
      return commonResponse({
        data: "",
        status: "error",
        message: t("validation.linkAlreadyExists"),
      });
    }

    const data = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await insertAffiliateLink(data);

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
