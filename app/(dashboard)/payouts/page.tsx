"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EarningCards from "@/components/payouts/EarningCards";
import PaymentInformation from "@/components/payouts/PaymentInformation";

export default function PayoutsPage() {
  const payouts = [
    {
      id: "1",
      date: "08-05-2025",
      earnings: "$2399.00",
      status: "Confirmed",
    },
    {
      id: "2",
      date: "08-05-2025",
      earnings: "$2399.00",
      status: "Pending",
    },
    {
      id: "3",
      date: "08-05-2025",
      earnings: "$2399.00",
      status: "Confirmed",
    },
    {
      id: "4",
      date: "08-05-2025",
      earnings: "$2399.00",
      status: "Declined",
    },
    {
      id: "5",
      date: "08-05-2025",
      earnings: "$2399.00",
      status: "Confirmed",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "text-green-600";
      case "Pending":
        return "text-orange-600";
      case "Declined":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Payouts</h1>
        </div>

        <div className="text-sm text-gray-600 mb-6">Affiliate Earnings</div>

        <EarningCards />

        <PaymentInformation />

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              Payout History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 font-medium">
                    Date
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium">
                    Earnings
                  </TableHead>
                  <TableHead className="text-gray-600 font-medium text-right">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow
                    key={payout.id}
                    className="border-b border-gray-100"
                  >
                    <TableCell className="text-gray-600">
                      {payout.date}
                    </TableCell>
                    <TableCell className="text-gray-900 font-medium">
                      {payout.earnings}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-medium ${getStatusColor(
                          payout.status
                        )}`}
                      >
                        {payout.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
