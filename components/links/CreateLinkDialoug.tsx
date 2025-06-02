"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/client";
import { Api } from "@/services/api-services";
import { AffiliateLinkSchema } from "@/utils/validation";
import { Formik } from "formik";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateAffiliateLink() {
  const { t } = useTranslation();
  const user = useSession().data?.user;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mainUrl = "http://localhost:3000/l";

  const initialValues = {
    link: "",
    name: "",
  };

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setIsLoading(true);
      const data = {
        campaignId: 1,
        affiliateId: Number(user?.id || 1),
        name: values.name,
        slug: values.link,
        destinationUrl: `${mainUrl}/${values.link}`,
        sub1: "",
        sub2: "",
        sub3: "",
        totalClicks: 0,
        totalEarnings: 0,
        status: "active",
      };
      const response = await Api.post({
        path: "/links/insert-link",
        body: data,
      });
      if (response.status === "error") {
        toast({
          title: t("error"),
          description: response.message || t("validation.unknownError"),
          variant: "destructive",
        });
        return;
      }
      toast({
        title: t("validation.linkCreated"),
        description: t("validation.linkCreatedDescription"),
      });
      resetForm();
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-600 hover:bg-blue-700 max-w-sm px-2 w-auto gap-2 m-0"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-4 w-4" />
        {t("affiliateLink.create")}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("affiliateLink.dialogTitle")}</DialogTitle>
            <p className="text-sm text-muted-foreground">
              {t("affiliateLink.dialogDescription")}
            </p>
          </DialogHeader>

          <Formik
            initialValues={initialValues}
            validationSchema={AffiliateLinkSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="link">
                    {t("affiliateLink.urlLabel")}
                    <span className="text-red-500"> *</span>
                  </Label>
                  <div className="relative w-full">
                    <span
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none select-none"
                      style={{ userSelect: "none" }}
                    >
                      {mainUrl}/
                    </span>
                    <Input
                      id="link"
                      name="link"
                      type="text"
                      placeholder={t("affiliateLink.urlPlaceholder")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.link}
                      className="pl-[calc( (100%) / 3 )] pr-3"
                      style={{ paddingLeft: `${mainUrl.length - 2}ch` }}
                    />
                  </div>
                  {touched.link && errors.link && (
                    <p className="text-sm text-red-500">{errors.link}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    {t("affiliateLink.nameLabel")}
                    <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("affiliateLink.namePlaceholder")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="text-black"
                    disabled={isSubmitting || isLoading}
                  >
                    {t("affiliateLink.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="bg-brand-500 text-white hover:bg-brand-700"
                    disabled={isSubmitting || isLoading}
                    isLoading={isLoading}
                  >
                    {isLoading
                      ? t("affiliateLink.creating")
                      : t("affiliateLink.save")}
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
