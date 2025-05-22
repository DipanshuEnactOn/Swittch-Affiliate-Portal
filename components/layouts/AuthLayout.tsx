import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="max-h-screen flex h-auto">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
      <div className="hidden lg:block flex-1 bg-[#161950] relative">
        <div className="w-full flex items-center justify-center h-full">
          <Image
            src="/logo.svg"
            alt="Logo"
            height={250}
            width={250}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
