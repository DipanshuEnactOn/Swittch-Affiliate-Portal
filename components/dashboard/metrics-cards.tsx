import { Card, CardContent } from "@/components/ui/card";
import { LightbulbIcon, Link, DollarSign } from "lucide-react";

export function MetricsCards({
  totalClicks = 3782,
  totalLinks = 3782,
  totalEarnings = 5359,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <MetricCard
        title="Total Clicks"
        value={totalClicks.toLocaleString()}
        icon={<LightbulbIcon className="h-6 w-6 text-blue-500" />}
      />
      <MetricCard
        title="Total Links"
        value={totalLinks.toLocaleString()}
        icon={<Link className="h-6 w-6 text-blue-500" />}
      />
      <MetricCard
        title="Total Earnings"
        value={totalEarnings.toLocaleString()}
        icon={<DollarSign className="h-6 w-6 text-blue-500" />}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="px-6 py-4 space-y-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="bg-blue-50 p-2 rounded-lg">{icon}</div>
        </div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
