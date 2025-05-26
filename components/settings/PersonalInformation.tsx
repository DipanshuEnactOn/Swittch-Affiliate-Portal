"use client";

import React from "react";
import { Formik, Form } from "formik";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PersonalInformationSchema } from "@/utils/validation";
export default function PersonalInformation({ affiliateUser }: any) {
  const initialValues = {
    name: affiliateUser.name || "",
    email: affiliateUser.email || "affiliate@reaction.com",
  };

  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-6">Personal Information</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validationSchema={PersonalInformationSchema}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm text-gray-600">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={values.name}
                    className="bg-white"
                    onChange={handleChange}
                  />
                  {touched.name && errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.toString()}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-600">
                    Email
                  </Label>
                  <Input
                    id="email"
                    className="bg-slate-100"
                    disabled
                    value={values.email}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
