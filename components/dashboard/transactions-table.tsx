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
import { statusColors } from "@/utils/get-color-for-status";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";

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
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const rowValue = row.original;
        return <div className="flex items-center">{rowValue.createdAt}</div>;
      },
    },
    {
      accessorKey: "campaignId",
      header: "Link",
      cell: ({ row }) => {
        const rowValue = row.original;
        return <div className="flex items-center">{rowValue.campaignId}</div>;
      },
    },
    {
      accessorKey: "campaignGoalId",
      header: "Goal",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center">{rowValue.campaignGoalId}</div>
        );
      },
    },
    {
      accessorKey: "sub1",
      header: "SubId1",
      cell: ({ row }) => {
        const rowValue = row.original;
        return <div className="flex items-center">{rowValue.sub1}</div>;
      },
    },
    {
      accessorKey: "sub2",
      header: "SubId2",
      cell: ({ row }) => {
        const rowValue = row.original;
        return <div className="flex items-center">{rowValue.sub2}</div>;
      },
    },
    {
      accessorKey: "commission",
      header: "Earning",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center">
            ${rowValue.commission.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const rowValue = row.original;
        return (
          <div className="flex items-center">
            <StatusBadge status={rowValue.status} />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: transactions || [],
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

  // if (!transactions || transactions.length === 0) {
  //   return (
  //     <Card className="border rounded-lg">
  //       <CardHeader>
  //         <CardTitle>No Recent Transactions</CardTitle>
  //       </CardHeader>
  //       <CardContent>
  //         <p className="text-gray-500">You have no recent transactions.</p>
  //       </CardContent>
  //     </Card>
  //   );
  // }

  return (
    <Card className="border rounded-2xl">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search/Filter Input */}
          {/* <div className="flex items-center space-x-2">
            <input
              placeholder="Filter transactions..."
              value={
                (table.getColumn("campaignId")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("campaignId")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Table */}
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
                      No recent transactions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <Link href={AppRoutes.transactions}>
              <Button className="text-white bg-blue-600 hover:bg-blue-700">
                View all transactions <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SortIcon({ sorted }: { sorted: false | "asc" | "desc" }) {
  if (sorted === "asc") {
    return <ArrowUp className="ml-2 h-4 w-4" />;
  }
  if (sorted === "desc") {
    return <ArrowDown className="ml-2 h-4 w-4" />;
  }
  return <ArrowUpDown className="ml-2 h-4 w-4" />;
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn("bg-white rounded-lg shadow-sm overflow-hidden", className)}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

function CardHeader({ className, children }: CardHeaderProps) {
  return <div className={cn("px-6 py-4 border-b", className)}>{children}</div>;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

function CardTitle({ className, children }: CardTitleProps) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

function CardContent({ className, children }: CardContentProps) {
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
        statusColors[
          status.toLowerCase() as "confirmed" | "pending" | "declined"
        ] || "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  );
}
