import MainProgressBar from "@/components/MainProgressBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swittch Affiliate Portal",
  description: "Swittch Affiliate Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={inter.className}>
        <MainProgressBar>
          <SessionProvider>{children}</SessionProvider>
        </MainProgressBar>
      </body>
    </html>
  );
}
