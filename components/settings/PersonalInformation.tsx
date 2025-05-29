"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PersonalInformationSchema } from "@/utils/validation";
import { Api } from "@/services/api-services";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/client";

export default function PersonalInformation({ affiliateUser }: any) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    name: affiliateUser?.name || "",
    email: affiliateUser?.email || "affiliate@reaction.com",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      const data = {
        ...values,
        id: affiliateUser.id,
      };
      const response = await Api.post({
        path: "/update-profile",
        body: data,
      });

      if (response.status === "success") {
        toast({
          title: t("profile.toast.successTitle"),
          description: t("profile.toast.successMessage"),
        });
      } else {
        toast({
          title: t("profile.toast.errorTitle"),
          description: response.message || t("profile.toast.errorMessage"),
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: t("profile.toast.errorTitle"),
        description: error || t("profile.toast.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-6">{t("profile.title")}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize
          validationSchema={PersonalInformationSchema}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-600">
                    {t("profile.fields.name")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("profile.fields.placeholder.name")}
                    value={values.name}
                    className="bg-white"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.toString()}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-600">
                    {t("profile.fields.email")}
                  </Label>
                  <Input
                    id="email"
                    className="bg-slate-100 hover:cursor-not-allowed"
                    disabled
                    value={values.email}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                  isLoading={isLoading}
                  type="submit"
                >
                  {t("profile.button")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
