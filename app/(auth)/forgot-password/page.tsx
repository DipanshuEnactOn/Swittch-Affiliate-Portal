"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { ArrowLeftIcon } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    // Here you would typically make an API call to create the user
    // For now, we'll simulate a successful signup
    // const result = await signIn("credentials", {
    //   ...values,
    //   redirect: false,
    // });
    // if (result?.ok) {
    //   router.push(AppRoutes.auth.pending);
    // }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 space-y-5">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="font-semibold text-gray-800 dark:text-white/90 sm:text-title-md text-3xl">
            {t("auth.forgotPassword.title")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t("auth.forgotPassword.description")}
          </p>
        </div>

        <AuthForm type="forgot-password" onSubmit={handleSubmit} />

        <div className="flex gap-1 w-full">
          <ArrowLeftIcon className="w-4 h-4 text-brand-500 hover:text-brand-600 mt-0.5" />
          <Link
            href="/signin"
            className="text-sm hover:underline text-brand-500 font-semibold hover:text-brand-600"
          >
            {t("auth.forgotPassword.backToSignIn")}
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
