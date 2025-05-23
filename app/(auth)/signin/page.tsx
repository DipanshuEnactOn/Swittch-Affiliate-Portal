"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";
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
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 space-y-5">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="font-semibold text-gray-800 dark:text-white/90 sm:text-title-md text-3xl">
            {t("auth.signIn.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("auth.signIn.description")}
          </p>
        </div>

        <AuthForm type="signin" onSubmit={handleSubmit} />

        <div className="flex gap-1 w-full">
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.signIn.noAccount")}
          </p>
          <Link
            href="/signup"
            className="text-sm hover:underline text-brand-500 font-semibold"
          >
            {t("auth.signIn.signUp")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
