"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface AuthFormProps {
  type: "signin" | "signup" | "forgot-password";
  onSubmit: (values: any) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    ...(type === "signup" && {
      name: Yup.string().required(t("validation.required")),
    }),
    email: Yup.string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: Yup.string()
      .min(8, t("validation.password"))
      .required(t("validation.required")),
  });

  const initialValues = {
    ...(type === "signup" && { name: "" }),
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">
                {t("auth.signUp.name")}
                <span className="text-red-500"> *</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={t("auth.placeholder.name")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">
              {t(`auth.${type === "signin" ? "signIn" : "signUp"}.email`)}
              <span className="text-red-500"> *</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={t("auth.placeholder.email")}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {type !== "forgot-password" && (
            <div className="space-y-2">
              <Label htmlFor="password">
                {t(`auth.${type === "signin" ? "signIn" : "signUp"}.password`)}
                <span className="text-red-500"> *</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t("auth.placeholder.password")}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          )}
          {type === "signin" && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  {t("auth.signIn.rememberMe")}
                </Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-sm text-brand-500 hover:underline hover:text-brand-600"
              >
                {t("auth.signIn.forgotPassword")}
              </Link>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-brand-500 text-white hover:bg-brand-700 rounded-md"
          >
            {t(
              `auth.${
                type === "signin"
                  ? "signIn"
                  : type === "signup"
                  ? "signUp"
                  : "forgotPassword"
              }.submit`
            )}
          </Button>
        </form>
      )}
    </Formik>
  );
}
