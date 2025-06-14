"use client";

import { CreateAffiliateLink } from "@/components/links/CreateLinkDialoug";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/client";
import { Api } from "@/services/api-services";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Copy } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TablePagination from "../TablePagination";

export default function LinksTable({ data }: { data: any }) {
  const { t } = useTranslation();
  const router = useRouter();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: t("success"),
      description: t("links.copySuccess"),
    });
  };

  const hanldeStatusChange = async (id: string, status: string) => {
    try {
      const newStatus = status === "active" ? "inactive" : "active";
      const response = await Api.post({
        path: "/links/update-status",
        body: { id, status: newStatus },
      });
      if (response.status === "error") {
        toast({
          variant: "destructive",
          title: t("error"),
          description: t("links.updateError"),
        });
        return;
      }
      toast({
        title: t("success"),
        description: t("links.updateSuccess"),
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating link status:", error);
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("links.updateError"),
      });
    }
  };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: t("links.date"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center text-gray-500">
            {moment(row.original.createdAt).format("DD-MM-YYYY")}
          </div>
        );
      },
    },
    {
      accessorKey: "link",
      header: t("links.url"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3 max-w-xs">
            <Link
              className="truncate hover:underline"
              href={row.original.destinationUrl || "#"}
              target="_blank"
            >
              {row.original.destinationUrl || "No URL"}
            </Link>
            <Copy
              className="h-4 w-4 p-0 text-blue-600 hover:bg-blue-50 cursor-pointer"
              onClick={() => copyToClipboard(row.original.destinationUrl)}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: t("links.name"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center text-gray-700">
            {row.original.name}
          </div>
        );
      },
    },
    {
      accessorKey: "clicks",
      header: t("links.clicks"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center text-gray-700">
            {row.original.totalClicks || 0}
          </div>
        );
      },
    },
    {
      accessorKey: "active",
      header: t("links.actions"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Switch
              checked={row.original.status === "active"}
              className="data-[state=checked]:bg-brand-500"
              onCheckedChange={() =>
                hanldeStatusChange(row.original.id, row.original.status)
              }
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.result || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 py-4 border-b space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("links.table_title")}
          </h3>
        </div>
        <CreateAffiliateLink />
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-gray-600 font-medium px-4 py-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="border-b hover:bg-gray-50"
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4 py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {t("links.noLinks")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination table={table} pagination={data.pagination} />
        </div>
      </CardContent>
    </Card>
  );
}
