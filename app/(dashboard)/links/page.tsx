"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Copy, Plus } from "lucide-react";
import { ActiveCampaign } from "@/components/dashboard/active-campaign";
import Link from "next/link";
import { useState } from "react";
import { CreateAffiliateLink } from "@/components/CreateLinkDialoug";

export default function LinksPage() {
  const [links, setLinks] = useState([
    {
      id: "1",
      date: "08-05-2025",
      link: "http://www.sample.org/head",
      name: "Enact on Sample Link",
      clicks: 2,
      active: true,
    },
    {
      id: "2",
      date: "08-05-2025",
      link: "https://sample.org/cover",
      name: "Enact on Sample Link",
      clicks: 15,
      active: false,
    },
    {
      id: "3",
      date: "08-05-2025",
      link: "http://www.sample.org/head",
      name: "Enact on Sample Link",
      clicks: 10,
      active: false,
    },
    {
      id: "4",
      date: "08-05-2025",
      link: "https://sample.org/cover",
      name: "Enact on Sample Link",
      clicks: 20,
      active: false,
    },
    {
      id: "5",
      date: "08-05-2025",
      link: "http://www.sample.org/head",
      name: "Enact on Sample Link",
      clicks: 5,
      active: false,
    },
  ]);
  const [open, setOpen] = useState(false);

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
  };

  const toggleActive = (id: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, active: !link.active } : link
      )
    );
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Create Links</h1>
      </div>

      <ActiveCampaign />

      <Card>
        <CardHeader className="flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 py-4 border-b space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Recent Transactions
            </h3>
          </div>
          <Button
            className=" bg-blue-600 hover:bg-blue-700 max-w-sm px-2 w-auto gap-2 m-0"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create New Affiliate Link
          </Button>
        </CardHeader>
        <CardContent className="px-6 pt-0">
          <Table className="min-w-full">
            <TableHeader className="mb-4 flex w-full justify-between items-center gap-2 px-5"></TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableHead className="text-gray-600 font-medium px-6 py-4">
                  Date
                </TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-4">
                  Links
                </TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-4">
                  Name
                </TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-4">
                  Clicks
                </TableHead>
                <TableHead className="text-gray-600 font-medium px-6 py-4">
                  Actions
                </TableHead>
              </TableRow>
              {links.map((link) => (
                <TableRow key={link.id} className="border-b hover:bg-gray-50">
                  <TableCell className="px-6 py-4 text-gray-500">
                    {link.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3 max-w-xs">
                      <Link
                        className="truncate hover:underline"
                        href={link.link}
                      >
                        {link.link}
                      </Link>
                      <Copy
                        className="h-4 w-4 p-0 text-blue-600 hover:bg-blue-50"
                        onClick={() => copyToClipboard(link.link)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700">
                    {link.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700">
                    {link.clicks}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <Switch
                      checked={link.active}
                      className="data-[state=checked]:bg-brand-500"
                      onCheckedChange={() => toggleActive(link.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateAffiliateLink open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
}
