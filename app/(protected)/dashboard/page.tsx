import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ActiveCampaign } from "@/components/dashboard/active-campaign";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { getAuthSession } from "@/models/auth-models";
import {
  getConversionsByAffiliate,
  getWeeklyCommissionDataByAffiliateId,
} from "@/models/conversions-model";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/utils/routes";
import { getCampaignById } from "@/models/campaigns-model";
import { createTranslation } from "@/i18n/server";

export default async function DashboardPage() {
  const { t } = await createTranslation();

  const user = await getAuthSession();
  const userStatus = user?.user?.status;

  if (userStatus === "pending") {
    return redirect(AppRoutes.auth.pending);
  }

  const campaignDetails = (await getCampaignById(1))?.data;

  const transactions =
    (await getConversionsByAffiliate(user.user.id, 10))?.data || [];

  const earningsData = await getWeeklyCommissionDataByAffiliateId(user.user.id);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">{t("dashboard.title")}</h1>
      <ActiveCampaign campaign={campaignDetails} />
      <MetricsCards />
      <EarningsChart earningsData={earningsData} />
      <TransactionsTable transactions={transactions} />
    </DashboardLayout>
  );
}
