import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import PersonalInformation from "@/components/settings/PersonalInformation";
import PasswordChange from "@/components/settings/PasswordChange";
import ConfigurePostback from "@/components/settings/ConfigurePostback";
import { getAffiliateByEmail } from "@/models/affiliates-model";
import { getAuthSession } from "@/models/auth-models";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/utils/routes";

export default async function SettingsPage() {
  const user = await getAuthSession();
  if (!user) {
    return redirect(AppRoutes.auth.signIn);
  }
  const affiliate = (await getAffiliateByEmail(user.user.email as string))
    ?.data;
  // console.log(affiliate);
  return (
    <DashboardLayout>
      <div className="mx-auto space-y-8">
        <h1 className="text-2xl font-semibold">Settings</h1>

        {/* Personal Information */}
        <PersonalInformation affiliateUser={affiliate} />

        {/* Change Password */}
        <PasswordChange affiliateUser={affiliate} />

        {/* Configure Postback */}
        <ConfigurePostback />

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
