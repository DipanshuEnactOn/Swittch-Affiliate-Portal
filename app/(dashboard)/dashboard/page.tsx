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

export default async function DashboardPage() {
  const user = await getAuthSession();
  const transactions =
    (await getConversionsByAffiliate(user.user.id))?.data || [];
  const earningsData = await getWeeklyCommissionDataByAffiliateId(user.user.id);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <ActiveCampaign />
      <MetricsCards />
      <EarningsChart earningsData={earningsData} />
      <TransactionsTable transactions={transactions} />
    </DashboardLayout>
  );
}
