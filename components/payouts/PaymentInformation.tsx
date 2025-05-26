import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function PaymentInformation() {
  return (
    <Card className="bg-white">
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-medium text-gray-800">
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-3">
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              PayPal
            </Label>
            <div className="flex space-x-3">
              <Input placeholder="Enter your PayPal ID" className="flex-1" />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 max-w-sm">
                Save
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
