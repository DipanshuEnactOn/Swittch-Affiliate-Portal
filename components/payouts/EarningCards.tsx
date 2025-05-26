"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Database, CreditCard, Clock, Wallet } from "lucide-react";
import { Button } from "../ui/button";
import { PayoutRequest } from "../PayoutRequestDialoug";

export default function EarningCards({ earningsData }: any) {
  const [open, setOpen] = useState(false);

  const cards = [
    {
      icon: Database,
      label: "Total Earnings",
      amount: "$5,359",
      color: "blue",
    },
    { icon: CreditCard, label: "Paid", amount: "$1,100", color: "cyan" },
    {
      icon: Clock,
      label: "Pending Earnings",
      amount: "$3,782",
      color: "orange",
    },
    {
      icon: Wallet,
      label: "Available",
      amount: "$1,230",
      color: "green",
      hasButton: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map(({ icon: Icon, label, amount, color, hasButton }) => (
        <Card key={label} className="bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col items-start space-y-3">
              <div className={`p-2 bg-${color}-100 rounded-lg`}>
                <Icon className={`h-5 w-5 text-${color}-600`} />
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600 mb-1">{label}</p>
                  <p className={`text-2xl font-semibold text-${color}-600`}>
                    {amount}
                  </p>
                </div>
                {hasButton && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm w-[10rem]"
                    onClick={() => setOpen(true)}
                  >
                    Withdraw
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <PayoutRequest open={open} setOpen={setOpen} />
    </div>
  );
}
