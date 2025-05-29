import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Campaign } from "@/db/schema";
import { createTranslation } from "@/i18n/server";
import { getAffiliateCampaignGoalsByAffiliateId } from "@/models/affiliate-campaign-goal-model";
import { getAuthSession } from "@/models/auth-models";
import { getCampaignGoalById } from "@/models/campaign-goal-model";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export async function ActiveCampaign({
  campaign,
}: {
  campaign: Campaign | null;
}) {
  const { t } = await createTranslation();
  const user = await getAuthSession();
  const campaignGoalsIds =
    (await getAffiliateCampaignGoalsByAffiliateId(campaign?.id || 1)).data ||
    [];

  // console.log("Campaign Goals Ids", campaignGoalsIds);

  const campaignGoals = await Promise.all(
    campaignGoalsIds.map(async (goal) => {
      const campaignGoal = await getCampaignGoalById(goal.campaignGoalId);
      return {
        title: campaignGoal.data?.name || "Unknown Goal",
        earnings: campaignGoal.data?.commissionAmount || "$0",
      };
    })
  );

  return (
    <Card className="mb-6">
      <CardHeader className="border-b">
        <h2 className="text-xl font-semibold">
          {t("campaign.activeCampaign")}
        </h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="bg-[#F0F9FF] rounded-lg p-6 border-[#0BA5EC] border-2">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={campaign?.logoUrl || "/images/swittch.png"}
                  width={100}
                  height={100}
                  alt="Campaign"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("campaign.details")}
                    </h3>
                    <h4 className="text-lg font-medium mt-2">
                      {campaign?.name || t("campaign.fallbackTitle")}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {campaign?.description ||
                        t("campaign.fallbackDescription")}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("campaign.goals")}
                    </h3>
                    <div className="space-y-3 mt-2">
                      {campaignGoals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{goal.title}</span>
                          <span className="text-sm font-medium ml-auto">
                            {t("campaign.earn").replace(
                              "{amount}",
                              goal.earnings
                            )}
                          </span>
                        </div>
                      ))}
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
