"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";
import { toast } from "@/hooks/use-toast";
import { AppRoutes } from "@/utils/routes";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    const result: any = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      toast({
        title: t("error"),
        description: t("validation.errorSigningIn"),
      });
    } else {
      toast({
        title: t("success"),
        description: t("validation.signInSuccess"),
      });
      setTimeout(() => {
        router.push(AppRoutes.auth.pending);
      }, 1500);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center min-h-screen w-full p-8 space-y-5">
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

        <div className="lg:!mt-0 flex flex-col gap-2 w-full">
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
