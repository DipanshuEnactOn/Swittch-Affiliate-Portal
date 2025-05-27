"use client";

import { Formik } from "formik";
import { useTranslation } from "@/i18n/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import * as Yup from "yup";
import { useState } from "react";
import { AffiliateLinkSchema } from "@/utils/validation";
import { Api } from "@/services/api-services";
import { toast } from "@/hooks/use-toast";

// Validation schema

export function CreateAffiliateLink() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const mainUrl = "http://localhost:3000";

  const initialValues = {
    link: "algo-crane",
    name: "EnactOn",
  };

  const onSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      setIsLoading(true);
      const response = await Api.post({ path: "/insert-link", body: values });
      if (response.status === "error") {
        toast({
          title: t("validation.errorCreatingLink"),
          description: response.message || t("validation.unknownError"),
          variant: "destructive",
        });
        return;
      }
      toast({
        title: t("validation.linkCreated"),
        description: t("validation.linkCreatedDescription", {
          link: `${mainUrl}/${values.link}`,
        }),
      });
      resetForm();
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
        Create New Affiliate Link
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Your Affiliate Link</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Once Created, URLs Cannot be Changed.
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
                    URL
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
                      placeholder="your-affiliate-link"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.link}
                      className="pl-[calc( (100%) / 3 )] pr-3"
                      style={{ paddingLeft: `${mainUrl.length - 1}ch` }}
                    />
                  </div>
                  {touched.link && errors.link && (
                    <p className="text-sm text-red-500">{errors.link}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Name
                    <span className="text-red-500"> *</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter affiliate name"
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
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-brand-500 text-white hover:bg-brand-700"
                    disabled={isSubmitting || isLoading}
                    isLoading={isLoading}
                  >
                    {isLoading ? "Creating..." : "Save"}
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
