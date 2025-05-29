import { createTranslation } from "@/i18n/server";
import { updateAffiliateBankDetails } from "@/models/affiliates-model";
import { commonResponse } from "@/utils/response-format";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();
  try {
    const body = await request.json();

    const { id, bankDetails } = body;

    const result = await updateAffiliateBankDetails(id, bankDetails);

    if (result.status === "error") {
      return commonResponse({
        data: result.data,
        status: "error",
        message: t("payments.errorUpdatingBankDetails"),
      });
    }

    return commonResponse({
      data: result.data?.id,
      status: "success",
      message: t("payments.bankDetailsUpdated"),
    });
  } catch (error) {
    return commonResponse({
      data: error,
      status: "error",
      message: t("payments.invalidData"),
    });
  }
}
