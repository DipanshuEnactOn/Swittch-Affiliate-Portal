import { Sidebar } from "../Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-10 bg-slate-50 h-auto min-h-screen">{children}</main>
      </div>
    </div>
  );
}
