"use client";

import React from "react";
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
import { CreateAffiliateLink } from "@/components/CreateLinkDialoug";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Copy, Plus } from "lucide-react";

export default function LinksTable({ data }: { data: any }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  //   const copyToClipboard = (text: string) => {
  //     navigator.clipboard.writeText(text);
  //   };

  //   const toggleActive = (id: string) => {
  //     setLinks((prevLinks) =>
  //       prevLinks.map((link) =>
  //         link.id === id ? { ...link, active: !link.active } : link
  //       )
  //     );
  //   };

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center text-gray-500">{rowValue.date}</div>
        );
      },
    },
    {
      accessorKey: "link",
      header: "Links",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center gap-3 max-w-xs">
            <Link className="truncate hover:underline" href={rowValue.link}>
              {rowValue.link}
            </Link>
            <Copy
              className="h-4 w-4 p-0 text-blue-600 hover:bg-blue-50 cursor-pointer"
              //   onClick={() => copyToClipboard(rowValue.link)}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center text-gray-700">{rowValue.name}</div>
        );
      },
    },
    {
      accessorKey: "clicks",
      header: "Clicks",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center text-gray-700">
            {rowValue.clicks}
          </div>
        );
      },
    },
    {
      accessorKey: "active",
      header: "Actions",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center">
            <Switch
              checked={rowValue.active}
              className="data-[state=checked]:bg-brand-500"
              //   onCheckedChange={() => toggleActive(rowValue.id)}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
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
    getPaginationRowModel: getPaginationRowModel(),
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
            Recent Transactions
          </h3>
        </div>
        <CreateAffiliateLink />
      </CardHeader>
      <CardContent className="px-6 pt-6">
        <div className="space-y-4">
          {/* Search/Filter Input */}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Filter links..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

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
                      No links found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
