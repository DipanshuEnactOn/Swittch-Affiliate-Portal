import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Settings</h1>

        {/* Personal Information */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-gray-600">
                  Name
                </Label>
                <Input id="name" defaultValue="Owen" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-gray-600">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue="affiliate@reaction.com"
                  className="bg-white"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-6">Change Password</h2>
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
                    type="password"
                    placeholder="Enter your current password"
                    className="bg-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    <Eye className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm text-gray-600">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    className="bg-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    <Eye className="h-4 w-4 text-gray-400" />
                  </Button>
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
                    type="password"
                    placeholder="Re-enter your new password"
                    className="bg-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  >
                    <Eye className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
            </div>
          </CardContent>
        </Card>

        {/* Configure Postback */}
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

        {/* Postback Documentation */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-4">Postback Documentation</h2>
            <p className="text-sm text-gray-600 mb-4">
              To get a list of all surveys, please call the following URL:
            </p>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono mb-6 break-all">
              https://rev-api.swtch.tv/api/get-surveys?api_page_id=
              {`{your_app_id}`}&ext_user_id={`{ext_user_id}`}&subid_1=
              {`{your_subid_1}`}&subid_2={`{your_subid_2}`}
              &output_method=api&user_ip={`{user_ip}`}&user_agent=
              {`{user_agent}`}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-gray-600 font-medium">
                      Parameter
                    </th>
                    <th className="text-left py-2 text-gray-600 font-medium">
                      Description
                    </th>
                    <th className="text-left py-2 text-gray-600 font-medium">
                      Mandatory
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs text-gray-600 space-y-2">
                  <tr className="border-b">
                    <td className="py-3 font-mono">api_id={`{your_app_id}`}</td>
                    <td className="py-3">
                      You must submit your app ID with each request. You can
                      find your app ID in your CPX Research publisher dashboard
                      as soon as you create a new app.{" "}
                      <span className="text-blue-600 underline cursor-pointer">
                        here
                      </span>
                      .
                    </td>
                    <td className="py-3">Mandatory</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">
                      ext_user_id= {`{ext_user_id}`}
                    </td>
                    <td className="py-3">
                      The external user ID is a unique identifier for each of
                      your users on your end. It is required for CPX Research to
                      build a user profile and match users with future surveys
                      based on their past data, and will also be used for{" "}
                      <span className="text-blue-600 underline cursor-pointer">
                        postback/s2s/webhook communication
                      </span>
                      . The external user ID for a single user should always
                      remain the same and should not change.
                    </td>
                    <td className="py-3">Mandatory</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">
                      subid_1= {`{your_subid_1}`}
                    </td>
                    <td className="py-3">
                      If you would like to submit a custom parameter that should
                      be added to the entry links in your API response, you can
                      use our optional subid parameters.
                    </td>
                    <td className="py-3">Optional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">
                      subid_2= {`{your_subid_2}`}
                    </td>
                    <td className="py-3">
                      If you would like to submit a custom parameter that should
                      be added to the entry links in your API response, you can
                      use our optional subid parameters.
                    </td>
                    <td className="py-3">Optional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">output_method=api</td>
                    <td className="py-3">
                      This is a static parameter that must be included and
                      should not be changed.
                    </td>
                    <td className="py-3">Mandatory</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">ip_user={`{ip_user}`}</td>
                    <td className="py-3">
                      You must replace it with your users' IP addresses in order
                      to determine location, match them with region-specific
                      surveys, and enhance fraud detection. Only IPv4 research
                      can be sure they will get a better user experience.
                    </td>
                    <td className="py-3">Mandatory</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">
                      user_agent= {`{user_agent}`}
                    </td>
                    <td className="py-3">
                      Replace it with the user's browser/device user agent
                      string. This ensures compatibility with device-specific
                      surveys.
                    </td>
                    <td className="py-3">Optional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-mono">limit=12</td>
                    <td className="py-3">
                      The default maximum number of available surveys returned
                      in the API response is 12. You can adjust this value to
                      receive more or fewer surveys in your API response.
                    </td>
                    <td className="py-3">Optional</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-mono">
                      secure_hash= {`{secure_hash}`}
                    </td>
                    <td className="py-3">
                      Replace this with a hash provided to you in your dashboard
                      (MD5). This secures API requests by validating
                      authenticity and preventing tampering.
                    </td>
                    <td className="py-3">Recommended</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
