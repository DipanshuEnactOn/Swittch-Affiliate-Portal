import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ConfigurePostback() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-lg font-medium mb-6">Configure Postback</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="postbackType" className="text-sm text-gray-600">
              Select Postback Type
            </Label>
            <Select defaultValue="select-option">
              <SelectTrigger className="bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="select-option">Select Option</SelectItem>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="goal">Goal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="globalUrl" className="text-sm text-gray-600">
              Global
            </Label>
            <Input
              id="globalUrl"
              placeholder="Enter URL"
              className="bg-white"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
        </div>
      </CardContent>
    </Card>
  );
}
