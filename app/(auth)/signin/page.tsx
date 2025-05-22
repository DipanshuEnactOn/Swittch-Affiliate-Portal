"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "@/app/components/AuthForm";
import AuthLayout from "@/app/components/AuthLayout";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";

export default function SignInPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/pending");
    }
  };

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{t("auth.signIn.title")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("auth.signIn.description")}
        </p>
      </div>

      <AuthForm type="signin" onSubmit={handleSubmit} />

      <p className="text-center mt-6 text-sm text-muted-foreground">
        {t("auth.signIn.noAccount")}
        <Link href="/signup" className="text-primary hover:underline">
          {t("auth.signIn.signUp")}
        </Link>
      </p>
    </AuthLayout>
  );
}
