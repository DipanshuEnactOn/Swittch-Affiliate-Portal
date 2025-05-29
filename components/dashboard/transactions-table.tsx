"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveRight, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { transactionStatusColors } from "@/utils/get-color-for-status";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import { usePathname } from "next/navigation";
import TablePagination from "../TablePagination";
import { useTranslation } from "@/i18n/client";

interface Transaction {
  id: string;
  createdAt: string;
  campaignId: string;
  campaignGoalId: string;
  sub1: string;
  sub2: string;
  commission: number;
  status: "confirmed" | "declined" | "pending";
}

export function TransactionsTable({ transactions }: any) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const currentPath = usePathname();

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "createdAt",
      header: t("transactions.date"),
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.createdAt}</div>
      ),
    },
    {
      accessorKey: "campaignId",
      header: t("transactions.link"),
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.campaignId}</div>
      ),
    },
    {
      accessorKey: "campaignGoalId",
      header: t("transactions.goal"),
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.campaignGoalId}</div>
      ),
    },
    {
      accessorKey: "sub1",
      header: t("transactions.sub1"),
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.sub1}</div>
      ),
    },
    {
      accessorKey: "sub2",
      header: t("transactions.sub2"),
      cell: ({ row }) => (
        <div className="flex items-center">{row.original.sub2}</div>
      ),
    },
    {
      accessorKey: "commission",
      header: t("transactions.earning"),
      cell: ({ row }) => (
        <div className="flex items-center">
          ${row.original.commission.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("transactions.status"),
      cell: ({ row }) => (
        <div className="flex items-center">
          <StatusBadge status={row.original.status} />
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: transactions?.data || [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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
    <Card className="border rounded-2xl">
      <CardHeader>
        <CardTitle>{t("transactions.recent_title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
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
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
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
                      {t("transactions.noData")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {currentPath === AppRoutes.dashboard ? (
            <div className="flex justify-end">
              <Link href={AppRoutes.transactions}>
                <Button className="text-white bg-blue-600 hover:bg-blue-700">
                  {t("transactions.viewAll")}{" "}
                  <MoveRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <TablePagination
              table={table}
              pagination={transactions?.pagination}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  if (sorted === "asc") return <ArrowUp className="ml-2 h-4 w-4" />;
  if (sorted === "desc") return <ArrowDown className="ml-2 h-4 w-4" />;
  return <ArrowUpDown className="ml-2 h-4 w-4" />;
}

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}
    >
      {children}
    </div>
  );
}

function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("px-6 py-4 border-b", className)}>{children}</div>;
}

function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}

function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

function StatusBadge({
  status,
}: {
  status: "confirmed" | "declined" | "pending";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        transactionStatusColors[
          status.toLowerCase() as "approved" | "pending" | "declined" | "paid"
        ] || "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  );
}
