"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";

export default function SignUpPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    const result = values !== null;
    // const result = await signIn("credentials", {
    //   ...values,
    //   redirect: false,
    // });

    if (result) {
      router.push(AppRoutes.auth.signIn);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center max-h-screen w-full p-8 space-y-5">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="font-semibold text-gray-800 dark:text-white/90 sm:text-title-md text-3xl">
            {t("auth.signUp.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("auth.signUp.description")}
          </p>
        </div>

        <AuthForm type="signup" onSubmit={handleSubmit} />

        <div className="flex gap-1 w-full">
          <p className="text-center text-sm text-muted-foreground">
            {t("auth.signUp.haveAccount")}
          </p>
          <Link
            href="/signin"
            className="text-sm hover:underline text-blue-500 font-semibold"
          >
            {t("auth.signUp.signIn")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
