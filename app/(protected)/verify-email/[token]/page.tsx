import AuthLayout from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTranslation } from "@/i18n/server";
import {
  getAffiliateById,
  verifyAffiliateEmail,
} from "@/models/affiliates-model";
import { getAuthSession } from "@/models/auth-models";
import { AppRoutes } from "@/utils/routes";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { token: string } }) {
  const { token } = params;
  const user = await getAuthSession();
  const { t } = await createTranslation();

  if (!user || !token) {
    return redirect(AppRoutes.auth.signIn);
  }

  const affiliate = (await getAffiliateById(user.user.id))?.data;

  if (!affiliate || affiliate.token !== token) {
    return redirect(AppRoutes.auth.signIn);
  }

  const verifyUserEmail = await verifyAffiliateEmail(user.user.id);

  if (verifyUserEmail.status === "error") {
    return redirect(AppRoutes.auth.signIn);
  }

  return (
    <>
      <AuthLayout>
        <div className="max-h-screen flex flex-col place-items-center">
          <div className="flex-1 flex items-center justify-center p-8">
            <Card className="w-full p-8">
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

          <Link href={AppRoutes.auth.signIn}>
            <Button className="max-w-md mb-4">
              {t("auth.verify_email.backToSignIn")}
            </Button>
          </Link>
        </div>
      </AuthLayout>
    </>
  );
}
