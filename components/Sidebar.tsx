"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Config } from "@/utils/config";
import { AppRoutes } from "@/utils/routes";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar fixed top-0 left-0 z-9999 flex h-auto w-[290px] flex-col overflow-y-auto border-r border-gray-200 bg-white px-5 transition-all duration-300 lg:static lg:translate-x-0 dark:border-gray-800 dark:bg-black -translate-x-full">
      <div className="sidebar-header flex items-center gap-2 py-5 justify-between">
        <Link href={AppRoutes.dashboard} className="flex items-start">
          <Image
            src="/images/swittch.png"
            alt="Logo"
            height={100}
            width={100}
            className="w-20 h-20 object-contain"
          />
        </Link>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <p className="mb-4 text-xs leading-[20px] text-gray-400 uppercase">
          AFFILIATE
        </p>
        <nav className="mb-6 flex flex-col gap-4">
          {Config.env.app.sidebar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700",
                pathname === item.href
                  ? "bg-brand-50 text-brand-500"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
