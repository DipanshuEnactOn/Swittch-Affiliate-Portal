"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { useTranslation } from "@/i18n/client";
import Image from "next/image";

export default function PendingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <CardTitle className="text-center">
                {t("auth.pending.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                {t("auth.pending.message")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block flex-1 bg-[#161950] relative">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64">
            <Image
              src="/logo.svg"
              alt="Logo"
              layout="fill"
              objectFit="contain"
              priority
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
