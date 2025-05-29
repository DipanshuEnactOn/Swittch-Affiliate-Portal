import { createTranslation } from "@/i18n/server";
import {
  getAffiliateByEmail,
  insertAffiliate,
} from "@/models/affiliates-model";
import { commonResponse } from "@/utils/response-format";
import { SignUpSchema } from "@/utils/validation";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { t } = await createTranslation();
  try {
    const body = await request.json();

    await SignUpSchema.validate(body, {
      abortEarly: false,
      strict: true,
    });

    const { name, email, password } = body;

    const existingUser = await getAffiliateByEmail(email);
    if (existingUser.data) {
      return commonResponse({
        data: null,
        status: "error",
        message: t("auth.signup.emailAlreadyExists"),
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const newAffiliate = await insertAffiliate(newUser);
    if (newAffiliate.status === "error") {
      return commonResponse({
        data: null,
        status: "error",
        message: t("auth.signup.errorCreatingUser"),
      });
    }
    return commonResponse({
      data: newAffiliate.data,
      status: "success",
      message: t("auth.signup.userCreatedSuccessfully"),
    });
  } catch (error) {
    return commonResponse({
      data: error,
      status: "error",
      message: t("auth.signup.invalidData"),
    });
  }
}
