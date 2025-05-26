import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  getAffiliateCampaignGoalById,
  getAffiliateCampaignGoalsByAffiliateId,
} from "@/models/affiliate-campaign-goal-model";
import { getAuthSession } from "@/models/auth-models";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export async function ActiveCampaign() {
  const user = await getAuthSession();
  const campaignGoals = await getAffiliateCampaignGoalsByAffiliateId(
    user.user.id
  );
  // const campaignGoals = [
  //   {
  //     title: "Download the App",
  //     earnings: "$5",
  //   },
  //   {
  //     title: "Create an Account",
  //     earnings: "$10",
  //   },
  //   {
  //     title: "Complete the On-Boarding Process",
  //     earnings: "$12",
  //   },
  // ];

  return (
    <Card className="mb-6">
      <CardHeader className="border-b">
        <h2 className="text-xl font-semibold">Active Campaign</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="bg-[#F0F9FF] rounded-lg p-6 border-[#0BA5EC] border-2">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Image
                  src="/images/swittch.png"
                  width={100}
                  height={100}
                  alt="Campaign"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Campaign Details
                    </h3>
                    <h4 className="text-lg font-medium mt-2">Campaign Title</h4>
                    <p className="text-sm text-gray-500">
                      Campaign Description
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Campaign Goals
                    </h3>
                    <div className="space-y-3 mt-2">
                      {/* {campaignGoals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{goal.title}</span>
                          <span className="text-sm font-medium ml-auto">
                            Earn {goal.earnings}
                          </span>
                        </div>
                      ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
