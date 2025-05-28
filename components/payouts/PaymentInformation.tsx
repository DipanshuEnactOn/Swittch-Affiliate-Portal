"use client";

import { Formik } from "formik";
import { useTranslation } from "@/i18n/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as Yup from "yup";
import { useState } from "react";
import { BankDetailsSchema, PayPalSchema } from "@/utils/validation";
import { Api } from "@/services/api-services";
import { toast } from "@/hooks/use-toast";

interface PaymentInformationProps {
  onPayPalSubmit: (values: any) => void | Promise<void>;
  onBankDetailsSubmit: (values: any) => void | Promise<void>;
}

export default function PaymentInformation({
  onPayPalSubmit,
  onBankDetailsSubmit,
}: PaymentInformationProps) {
  const { t } = useTranslation();
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [bankLoading, setBankLoading] = useState(false);

  const paypalInitialValues = {
    paypalId: "",
  };

  const bankInitialValues = {
    bankName: "",
    accountNumber: "",
    ifscBicCode: "",
    accountHolderName: "",
    accountType: "",
    swiftCode: "",
  };

  const handlePaypalSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setPaypalLoading(true);
      const response = await Api.post({ path: "/update-paypal", body: values });
      if (response.status === "error") {
        toast({
          variant: "destructive",
          title: t("common.error"),
          description: response.message || t("common.somethingWentWrong"),
        });
      } else {
        toast({
          title: t("common.success"),
          description: t("payouts.paypalUpdated"),
        });
      }
      resetForm();
    } catch (error) {
      console.error("PayPal form submission error:", error);
    } finally {
      setPaypalLoading(false);
      setSubmitting(false);
    }
  };

  const handleBankDetailsSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      setBankLoading(true);
      const response = await Api.post({
        path: "/update-bank-details",
        body: values,
      });
      if (response.status === "error") {
        toast({
          variant: "destructive",
          title: t("common.error"),
          description: response.message || t("common.somethingWentWrong"),
        });
      } else {
        toast({
          title: t("common.success"),
          description: t("payouts.bankDetailsUpdated"),
        });
      }
      resetForm();
    } catch (error) {
      console.error("Bank details form submission error:", error);
    } finally {
      setBankLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* PayPal Form */}
      <Card className="bg-white">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium text-gray-800">
            PayPal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <Formik
            initialValues={paypalInitialValues}
            validationSchema={PayPalSchema}
            onSubmit={handlePaypalSubmit}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="paypalId">
                    PayPal ID
                    <span className="text-red-500"> *</span>
                  </Label>
                  <div className="flex space-x-3 mt-2">
                    <div className="flex-1">
                      <Input
                        id="paypalId"
                        name="paypalId"
                        type="text"
                        placeholder="Enter your PayPal email address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.paypalId}
                      />
                      {touched.paypalId && errors.paypalId && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.paypalId}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 min-w-[120px]"
                      disabled={isSubmitting || paypalLoading}
                      isLoading={paypalLoading}
                    >
                      Save PayPal
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>

      {/* Bank Details Form */}
      <Card className="bg-white">
        <CardHeader className="border-b">
          <CardTitle className="text-lg font-medium text-gray-800">
            Bank Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-4">
          <Formik
            initialValues={bankInitialValues}
            validationSchema={BankDetailsSchema}
            onSubmit={handleBankDetailsSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bankName">
                      Bank Name
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Input
                      id="bankName"
                      name="bankName"
                      type="text"
                      placeholder="Enter bank name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bankName}
                    />
                    {touched.bankName && errors.bankName && (
                      <p className="text-sm text-red-500">{errors.bankName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountHolderName">
                      Account Holder Name
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Input
                      id="accountHolderName"
                      name="accountHolderName"
                      type="text"
                      placeholder="Enter account holder name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accountHolderName}
                    />
                    {touched.accountHolderName && errors.accountHolderName && (
                      <p className="text-sm text-red-500">
                        {errors.accountHolderName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">
                      Account Number
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Input
                      id="accountNumber"
                      name="accountNumber"
                      type="text"
                      placeholder="Enter account number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accountNumber}
                    />
                    {touched.accountNumber && errors.accountNumber && (
                      <p className="text-sm text-red-500">
                        {errors.accountNumber}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ifscBicCode">
                      IFSC/BIC Code
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Input
                      id="ifscBicCode"
                      name="ifscBicCode"
                      type="text"
                      placeholder="Enter IFSC/BIC code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ifscBicCode}
                      style={{ textTransform: "uppercase" }}
                    />
                    {touched.ifscBicCode && errors.ifscBicCode && (
                      <p className="text-sm text-red-500">
                        {errors.ifscBicCode}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accountType">
                      Account Type
                      <span className="text-red-500"> *</span>
                    </Label>
                    <Select
                      value={values.accountType}
                      onValueChange={(value) =>
                        setFieldValue("accountType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="current">Current Account</SelectItem>
                        <SelectItem value="checking">
                          Checking Account
                        </SelectItem>
                        <SelectItem value="business">
                          Business Account
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {touched.accountType && errors.accountType && (
                      <p className="text-sm text-red-500">
                        {errors.accountType}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="swiftCode">SWIFT Code (Optional)</Label>
                    <Input
                      id="swiftCode"
                      name="swiftCode"
                      type="text"
                      placeholder="Enter SWIFT code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.swiftCode}
                      style={{ textTransform: "uppercase" }}
                    />
                    {touched.swiftCode && errors.swiftCode && (
                      <p className="text-sm text-red-500">{errors.swiftCode}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="text-white px-8 min-w-[140px]"
                    disabled={isSubmitting || bankLoading}
                    isLoading={bankLoading}
                  >
                    Save Bank Details
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
