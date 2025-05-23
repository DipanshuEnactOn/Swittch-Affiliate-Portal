import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ActiveCampaign } from "@/components/dashboard/active-campaign";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { TransactionsTable } from "@/components/dashboard/transactions-table";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <ActiveCampaign />
      <MetricsCards />
      <EarningsChart />
      <TransactionsTable />
    </DashboardLayout>
  );
}
