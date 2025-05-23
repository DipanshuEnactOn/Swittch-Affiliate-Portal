import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  date: string;
  link: string;
  goal: string;
  subId1: string;
  subId2: string;
  earning: string;
  status: "Confirmed" | "Pending" | "Declined";
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "08-05-2025",
    link: "YouTube",
    goal: "Download the app",
    subId1: "#or1o9",
    subId2: "#qqOwQ",
    earning: "$2399.00",
    status: "Confirmed",
  },
  {
    id: "2",
    date: "08-05-2025",
    link: "Instagram",
    goal: "Create account",
    subId1: "#ff672",
    subId2: "#14568",
    earning: "$2399.00",
    status: "Pending",
  },
  {
    id: "3",
    date: "08-05-2025",
    link: "Facebook",
    goal: "Complete onboarding",
    subId1: "#12389",
    subId2: "#hKO2b",
    earning: "$2399.00",
    status: "Confirmed",
  },
  {
    id: "4",
    date: "08-05-2025",
    link: "YouTube",
    goal: "Download the app",
    subId1: "#f1289",
    subId2: "#12769",
    earning: "$2399.00",
    status: "Declined",
  },
  {
    id: "5",
    date: "08-05-2025",
    link: "Twitter",
    goal: "Download the app",
    subId1: "#6r1oN",
    subId2: "#66798",
    earning: "$2399.00",
    status: "Confirmed",
  },
];

export function TransactionsTable() {
  return (
    <Card className="border rounded-lg">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>SubId1</TableHead>
              <TableHead>SubId2</TableHead>
              <TableHead>Earning</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.link}</TableCell>
                <TableCell>{transaction.goal}</TableCell>
                <TableCell>{transaction.subId1}</TableCell>
                <TableCell>{transaction.subId2}</TableCell>
                <TableCell>{transaction.earning}</TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" className="text-primary">
            View all transactions <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
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

interface StatusBadgeProps {
  status: "Confirmed" | "Pending" | "Declined";
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-green-100 text-green-800": status === "Confirmed",
          "bg-yellow-100 text-yellow-800": status === "Pending",
          "bg-red-100 text-red-800": status === "Declined",
        }
      )}
    >
      {status}
    </span>
  );
}
