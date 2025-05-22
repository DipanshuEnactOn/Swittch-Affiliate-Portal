"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
      <div className="hidden lg:block flex-1 bg-[#161950] relative">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <Image
              src="/images/image.png"
              alt="Logo"
              height={100}
              width={100}
            />
          </div>
        </div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Affiliate Portal</h2>
          <p className="text-white/80 max-w-md">
            Join our affiliate program and start earning today
          </p>
          <a
            href="#"
            className="inline-flex items-center text-sm mt-4 text-white/60 hover:text-white"
          >
            Learn more about our program
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
