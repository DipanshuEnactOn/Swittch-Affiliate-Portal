import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MailWarning } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { createTranslation } from "@/i18n/server";
import { getAffiliateStatus } from "@/models/affiliates-model";
import { getAuthSession } from "@/models/auth-models";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";

export default async function PendingPage() {
  const session = await getAuthSession();
  const { t } = await createTranslation();
  const status = (await getAffiliateStatus(session.user.email as string)).data
    ?.status;
  const emailVerified = (await getAffiliateStatus(session.user.email as string))
    .data?.emailVerified;

  if (status === "approved" && emailVerified) {
    return redirect(AppRoutes.dashboard);
  }

  return (
    <AuthLayout>
      <div className="flex-1 p-8 flex flex-col items-center justify-center gap-6 w-full">
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
        {emailVerified === false ? (
          <div className="flex-1 flex items-center justify-center max-w-lg">
            <Card className="w-full p-4 sm:p-8 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <MailWarning className="h-12 w-12 text-yellow-500" />
                </div>
                <CardTitle className="text-center">
                  {t("auth.pending.email_title")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {t("auth.pending.email_description")}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="w-full p-4 sm:p-8 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-center">
                {t("auth.pending.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                {t("auth.pending.message")}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthLayout>
  );
}
