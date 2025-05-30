"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Form, Formik } from "formik";
import { postbackSchema } from "@/utils/validation";
import { Api } from "@/services/api-services";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/i18n/client";

export default function ConfigurePostback({ goals }: any) {
  const { t } = useTranslation();
  const user = useSession().data?.user;

  const initialValues = {
    postbackType: "",
    globalUrl: "",
    selectedGoal: "",
    goalUrl: "",
  };

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setSubmitting(true);
      const data = {
        affiliateId: user?.id,
        campaignId: 1,
        campaignGoalId:
          values.postbackType === "goal"
            ? goals?.find((g: any) => g.title === values.selectedGoal).id
            : 1,
        postbackUrl:
          values.postbackType === "goal" ? values.goalUrl : values.globalUrl,
      };
      const response = await Api.post({ path: "/postback", body: data });
      if (response.status === "error") {
        toast({
          variant: "destructive",
          title: t("postback.toast.errorTitle"),
          description: response.message || t("postback.toast.errorMessage"),
        });
        return;
      }
      toast({
        title: t("postback.toast.successTitle"),
        description: t("postback.toast.successMessage"),
      });
      resetForm();
    } catch (error) {
      console.error("Error saving postback:", error);
      toast({
        variant: "destructive",
        title: t("postback.toast.errorTitle"),
        description: t("postback.toast.errorMessage"),
      });
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-6">{t("postback.title")}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={postbackSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="postbackType" className="text-sm text-gray-600">
                  {t("postback.selectType")}
                </Label>
                <Select
                  value={values.postbackType}
                  onValueChange={(value) => {
                    setFieldValue("postbackType", value);
                    setFieldValue("globalUrl", "");
                    setFieldValue("selectedGoal", "");
                    setFieldValue("goalUrl", "");
                  }}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue
                      placeholder={t("postback.placeholderOption")}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">
                      {t("postback.type.global")}
                    </SelectItem>
                    <SelectItem value="goal">
                      {t("postback.type.goal")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.postbackType && touched.postbackType && (
                  <p className="text-sm text-red-600">{errors.postbackType}</p>
                )}
              </div>

              {values.postbackType === "global" && (
                <div className="space-y-2">
                  <Label htmlFor="globalUrl" className="text-sm text-gray-600">
                    {t("postback.globalUrl.label")}
                  </Label>
                  <Input
                    id="globalUrl"
                    name="globalUrl"
                    value={values.globalUrl}
                    onChange={(e) => setFieldValue("globalUrl", e.target.value)}
                    placeholder={t("postback.globalUrl.placeholder")}
                    className="bg-white"
                  />
                  {errors.globalUrl && touched.globalUrl && (
                    <p className="text-sm text-red-600">{errors.globalUrl}</p>
                  )}
                </div>
              )}

              {values.postbackType === "goal" && (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="selectedGoal"
                      className="text-sm text-gray-600"
                    >
                      {t("postback.goal.label")}
                    </Label>
                    {goals.length === 0 ? (
                      <p className="text-sm text-gray-600">
                        {t("postback.noCampaignGoals")}
                      </p>
                    ) : (
                      <Select
                        value={values.selectedGoal}
                        onValueChange={(value) => {
                          setFieldValue("selectedGoal", value);
                          setFieldValue("goalUrl", "");
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue
                            placeholder={t("postback.goal.placeholder")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {goals.map((goal: any) => (
                            <SelectItem key={goal.id} value={goal?.name || ""}>
                              {goal?.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {errors.selectedGoal && touched.selectedGoal && (
                      <p className="text-sm text-red-600">
                        {errors.selectedGoal}
                      </p>
                    )}
                  </div>

                  {values.selectedGoal && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="goalUrl"
                        className="text-sm text-gray-600"
                      >
                        {t("postback.goal.urlLabel")}
                      </Label>
                      <Input
                        id="goalUrl"
                        name="goalUrl"
                        value={values.goalUrl}
                        onChange={(e) =>
                          setFieldValue("goalUrl", e.target.value)
                        }
                        placeholder={t("postback.goal.urlPlaceholder")}
                        className="bg-white"
                      />
                      {errors.goalUrl && touched.goalUrl && (
                        <p className="text-sm text-red-600">{errors.goalUrl}</p>
                      )}
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting
                    ? t("postback.button.saving")
                    : t("postback.button.save")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
