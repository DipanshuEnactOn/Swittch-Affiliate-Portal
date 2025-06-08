import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ActiveCampaign } from "@/components/dashboard/active-campaign";
import LinksTable from "@/components/links/LinksTable";
import { getAuthSession } from "@/models/auth-models";
import { getAffiliateLinksByAffiliateId } from "@/models/affiliate-link-model";
import { getCampaignById } from "@/models/campaigns-model";
import { createTranslation } from "@/i18n/server";
import { AppRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function LinksPage({ searchParams }: any) {
  const { rows_per_page, page } = searchParams;
  const { t } = await createTranslation();
  const user = await getAuthSession();
  const userStatus = user?.user?.status;

  if (userStatus === "pending") {
    return redirect(AppRoutes.auth.pending);
  }
  const campaignDetails = (await getCampaignById(1))?.data;
  const data =
    (
      await getAffiliateLinksByAffiliateId(user.user.id, {
        filters: { rows_per_page, page },
      })
    )?.data || [];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{t("links.title")}</h1>
      </div>

      <ActiveCampaign campaign={campaignDetails} />

      <LinksTable data={data} />
    </DashboardLayout>
  );
}
