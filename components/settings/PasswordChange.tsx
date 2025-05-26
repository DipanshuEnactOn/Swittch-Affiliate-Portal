"use client";

import React from "react";
import { Formik, Form } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import bcrypt from "bcrypt";
import { toast } from "@/hooks/use-toast";
import { ChangePasswordSchema } from "@/utils/validation";
export default function PasswordChange({ affiliateUser }: any) {
  const userPassword = affiliateUser?.password || "";
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (values.newPassword !== values.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-6">Change Password</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={ChangePasswordSchema}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="currentPassword"
                    className="text-sm text-gray-600"
                  >
                    Current Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      placeholder="Enter your current password"
                      className="bg-white pr-10"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.currentPassword && errors.currentPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm text-gray-600"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      className="bg-white pr-10"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm text-gray-600"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your new password"
                      className="bg-white pr-10"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
