import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTranslation } from "@/i18n/server";
import {
  getAffiliateById,
  verifyAffiliateEmail,
} from "@/models/affiliates-model";
import { getAuthSession } from "@/models/auth-models";
import { sendEmailToAffiliate } from "@/services/email-service";
import { AppRoutes } from "@/utils/routes";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  params,
  searchParams,
}: {
  params: { token: string };
  searchParams: { userId?: string };
}) {
  const { token } = params;
  const { userId } = searchParams;
  const { t } = await createTranslation();

  if (!userId || !token) {
    return redirect(AppRoutes.auth.signIn);
  }

  const affiliate = (await getAffiliateById(Number(userId)))?.data;

  if (!affiliate || affiliate.token !== token) {
    return redirect(AppRoutes.auth.signIn);
  }

  const verifyUserEmail = await verifyAffiliateEmail(Number(userId));

  if (verifyUserEmail.status === "error") {
    return redirect(AppRoutes.auth.signIn);
  }

  // const res = await sendEmailToAffiliate({
  //   type: "welcome",
  //   userId: userId,
  // });

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col place-items-center gap-6 p-8">
          <Link
            href={AppRoutes.dashboard}
            className="lg:hidden h-14 w-fit flex items-start mx-auto"
          >
            <Image
              src="/images/swittch.png"
              alt="Logo"
              height={100}
              width={100}
              className="max-h-12 w-auto"
            />
          </Link>

          <div className="flex-1 flex items-center justify-center">
            <Card className="w-full p-4 sm:p-8 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-center">
                  {t("auth.verify_email.title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {t("auth.verify_email.description")}
                </p>
              </CardContent>
            </Card>
          </div>

          <Link
            href={AppRoutes.auth.signIn}
            className="text-sm hover:underline text-brand-500 font-semibold"
          >
            {t("auth.verify_email.backToSignIn")}
          </Link>
        </div>
      </AuthLayout>
    </>
  );
}
