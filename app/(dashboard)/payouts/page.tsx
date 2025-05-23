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
import { Database, CreditCard, Clock, Wallet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { PayoutRequest } from "@/components/PayoutRequestDialoug";
import { useState } from "react";

export default function PayoutsPage() {
  const [open, setOpen] = useState(false);

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

        {/* Earnings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                    <p className="text-2xl font-semibold text-blue-600">
                      $5,359
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-cyan-100 rounded-lg">
                  <CreditCard className="h-5 w-5 text-cyan-600" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-1">Paid</p>
                    <p className="text-2xl font-semibold text-cyan-600">
                      $1,100
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-1">
                      Pending Earnings
                    </p>
                    <p className="text-2xl font-semibold text-orange-600">
                      $3,782
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-start space-y-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Wallet className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-600 mb-1">Available</p>
                    <p className="text-2xl font-semibold text-green-600">
                      $1,230
                    </p>
                  </div>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-[10rem]"
                    onClick={() => setOpen(true)}
                  >
                    Withdraw
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Information */}
        <Card className="bg-white">
          <CardHeader className="border-b">
            <CardTitle className="text-lg font-medium text-gray-800">
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-3">
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  PayPal
                </Label>
                <div className="flex space-x-3">
                  <Input
                    placeholder="Enter your PayPal ID"
                    className="flex-1"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 max-w-sm">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout History */}
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

      <PayoutRequest open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
}
