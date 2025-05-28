import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ActiveCampaign } from "@/components/dashboard/active-campaign";
import LinksTable from "@/components/links/LinksTable";
import { getAuthSession } from "@/models/auth-models";
import { getAffiliateLinksByAffiliateId } from "@/models/affiliate-link-model";
import { getCampaignById } from "@/models/campaigns-model";

export default async function LinksPage() {
  const user = await getAuthSession();
  const campaignDetails = (await getCampaignById(1))?.data;
  const data = (await getAffiliateLinksByAffiliateId(user.user.id))?.data || [];
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Create Links</h1>
      </div>

      <ActiveCampaign campaign={campaignDetails} />

      <LinksTable data={data} />
    </DashboardLayout>
  );
}
