"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { payoutStatusColors } from "@/utils/get-color-for-status";
import TablePagination from "../TablePagination";
import { useTranslation } from "@/i18n/client";

type PayoutStatus = "paid" | "pending" | "rejected" | "processing";

export default function PayoutsTable({ data }: any) {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: t("payouts.table.date"),
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center text-gray-600">{rowValue.date}</div>
        );
      },
    },
    {
      accessorKey: "earnings",
      header: t("payouts.table.earnings"),
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center text-gray-900 font-medium">
            {rowValue.earnings}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: t("payouts.table.status"),
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center justify-end">
            <span
              className={`font-medium ${
                payoutStatusColors[rowValue.status as PayoutStatus]
              }`}
            >
              {rowValue.status}
            </span>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data.result,
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
    <Card className="rounded-2xl bg-white">
      <CardHeader className="flex flex-col gap-2 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 py-4 border-b space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {t("payouts.table.title")}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-6">
        <div className="space-y-4">
          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-gray-600 font-medium px-6 py-4"
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
                        <TableCell key={cell.id} className="px-6 py-4">
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
                      {t("payouts.table.empty")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination table={data.result} pagination={data.pagination} />
        </div>
      </CardContent>
    </Card>
  );
}
