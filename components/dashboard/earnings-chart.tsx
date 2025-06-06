"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTranslation } from "@/i18n/client";

export function EarningsChart({ earningsData }: { earningsData: any }) {
  const { t } = useTranslation();

  const maxValue = Math.max(...earningsData.map((item: any) => item.amount));

  const adjustedMaxValue = maxValue + maxValue * 0.1;
  const numberOfTicks = 5;
  const tickInterval = adjustedMaxValue / (numberOfTicks - 1);
  const ticks = Array.from(
    { length: numberOfTicks },
    (_, i) => i * tickInterval
  );

  return (
    <Card className="mb-6">
      <CardHeader className="border-b mb-3">
        <CardTitle>{t("earnings.chartTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="mt-5">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={earningsData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.2}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, adjustedMaxValue]}
                ticks={ticks}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#4F46E5"
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
