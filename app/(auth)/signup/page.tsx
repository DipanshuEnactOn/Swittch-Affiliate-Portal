"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AuthForm from "@/app/components/AuthForm";
import AuthLayout from "@/app/components/AuthLayout";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    // Here you would typically make an API call to create the user
    // For now, we'll simulate a successful signup
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
        <h1 className="text-2xl font-bold">{t("auth.signUp.title")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("auth.signUp.description")}
        </p>
      </div>

      <AuthForm type="signup" onSubmit={handleSubmit} />

      <p className="text-center mt-6 text-sm text-muted-foreground">
        {t("auth.signUp.haveAccount")}{" "}
        <Link href="/signin" className="text-primary hover:underline">
          {t("auth.signUp.signIn")}
        </Link>
      </p>
    </AuthLayout>
  );
}
