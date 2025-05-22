"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface AuthFormProps {
  type: "signin" | "signup";
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

  const formik = useFormik({
    initialValues: {
      ...(type === "signup" && { name: "" }),
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {type === "signup" && (
        <div className="space-y-2">
          <Label htmlFor="name">{t("auth.signUp.name")}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">
          {t(`auth.${type === "signin" ? "signIn" : "signUp"}.email`)}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-sm text-red-500">{formik.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {t(`auth.${type === "signin" ? "signIn" : "signUp"}.password`)}
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <p className="text-sm text-red-500">{formik.errors.password}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {t(`auth.${type === "signin" ? "signIn" : "signUp"}.submit`)}
      </Button>
    </form>
  );
}
