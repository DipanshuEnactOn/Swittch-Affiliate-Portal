import { ActiveCampaign } from "@/components/dashboard/active-campaign";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { TransactionsTable } from "@/components/dashboard/transactions-table";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { createTranslation } from "@/i18n/server";
import { getAuthSession } from "@/models/auth-models";
import { getCampaignById } from "@/models/campaigns-model";
import {
  getAllAffiliateTransactions,
  getWeeklyCommissionDataByAffiliateId,
} from "@/models/conversions-model";
import { AppRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { t } = await createTranslation();

  const user = await getAuthSession();
  const userStatus = user?.user?.status;

  if (userStatus === "pending") {
    return redirect(AppRoutes.auth.pending);
  }

  const campaignDetails = (await getCampaignById(1))?.data;

  const transactions =
    (await getAllAffiliateTransactions(user.user.id, 10)) || [];

  const earningsData = await getWeeklyCommissionDataByAffiliateId(user.user.id);

  console.log(earningsData);  

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
