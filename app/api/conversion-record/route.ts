import { conversionStatusEnum, NewPostbackLog } from "@/db/schema";
import { createTranslation } from "@/i18n/server";
import { getClickByClickCode } from "@/models/clicks-model";
import { insertPostbackLog } from "@/models/postback-log-model";
import { commonResponse } from "@/utils/response-format";
import { NextRequest } from "next/server";
import { postbackStatusEnum } from "@/db/schema";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();

  try {
    const body = await request.json();
    const { goal_id, click_code, transaction_id, status } = body;

    const validStatuses = Object.values(conversionStatusEnum)[1];

    if (
      !validStatuses.includes(status) ||
      status === "paid" ||
      status === undefined ||
      status === null
    ) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.invalidStatus"),
      });
    }

    const forwarded = request.headers.get("x-forwarded-for");
    const clientIP = forwarded
      ? forwarded.split(",")[0]
      : request.ip || "unknown";

    const clickRecord = (await getClickByClickCode(click_code))?.data;
    const transactionId = transaction_id;

    if (!transactionId) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.transactionIdRequired"),
      });
    }

    if (!clickRecord) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.invalidClickCode"),
      });
    }

    const data: NewPostbackLog = {
      rawPostbackData: body,
      transactionId: transactionId,
      status: "pending",
      statusMessages: null,
      receivedAt: new Date().toISOString(),
    };
    console.log("Postback log data:", data);
    const postback_log = await insertPostbackLog(data);

    if (postback_log.status === "error") {
      return commonResponse({
        data: postback_log,
        status: "error",
        message: t("conversion.logInsertFailed"),
      });
    }

    return commonResponse({
      data: postback_log.data,
      status: "success",
      message: "",
    });
  } catch (error) {
    console.error("Conversion record API error:", error);
    return commonResponse({
      data: null,
      status: "error",
      message: t("conversion.invalidData"),
    });
  }
}
