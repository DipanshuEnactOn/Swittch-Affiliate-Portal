"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import AuthForm from "@/components/AuthForm";
import AuthLayout from "@/components/layouts/AuthLayout";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { Api } from "@/services/api-services";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

export default function SignUpPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async (values: any) => {
    try {
      const result = await Api.post({ path: "/sign-up", body: values });
      if (!result || result.status === "error") {
        toast({
          title: t("validation.errorCreatingUser"),
          description: result?.message || t("validation.invalidData"),
        });
        return;
      }
      toast({
        title: t("validation.userCreatedSuccessfully"),
        description: t("validation.checkEmailForVerification"),
      });
      router.push(AppRoutes.auth.signIn);
    } catch (error) {
      console.error("Error during sign up:", error);
      toast({
        title: t("validation.errorCreatingUser"),
        description: t("validation.invalidData"),
      });
    }
  };

  return (
    <AuthLayout>
      <div className="w-full p-8 space-y-5">
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
