"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/i18n/client";
import { signOut } from "next-auth/react";

const Header = () => {
  const { t } = useTranslation();
  React.useEffect(() => {
    const body = document.querySelector("body");
    const toggleBtn = document.querySelector(".header-toggle-btn");
    const toggleBtnXIcon = document.querySelector(
      ".header-toggle-btn .x-mark-icon"
    );
    const toggleBtnBarIcon = document.querySelector(
      ".header-toggle-btn .bar-icon"
    );
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");
    const overlay = document.querySelector("#overlay");

    if (
      toggleBtn &&
      sidebar &&
      mainContent &&
      toggleBtnXIcon &&
      toggleBtnBarIcon &&
      overlay &&
      body
    ) {
      body.classList.add("body-overflow-hidden");
      const toggleSidebar = () => {
        toggleBtn.classList.toggle("active");
        toggleBtnXIcon.classList.toggle("hidden");
        toggleBtnBarIcon.classList.toggle("hidden");
        sidebar.classList.toggle("-translate-x-full");
        sidebar.classList.toggle("translate-x-0");
        mainContent.classList.toggle("overflow-y-hidden");
        overlay.classList.toggle("hidden");
      };

      toggleBtn.addEventListener("click", toggleSidebar);
      overlay.addEventListener("click", toggleSidebar);

      return () => {
        toggleBtn.removeEventListener("click", toggleSidebar);
        overlay.removeEventListener("click", toggleSidebar);
      };
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({
        redirectTo: AppRoutes.auth.signIn,
      });
      toast({
        title: t("success"),
        description: t("auth.logout.success"),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="header admin-header sticky top-0 z-20 px-4 sm:px-6 py-3 flex w-full border-gray-200 bg-white border-b">
      <div className="flex grow items-center justify-between gap-1">
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="header-toggle-btn lg:hidden flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 lg:h-11 lg:w-11 border">
            {/* bar icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bar-icon h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            {/* xmark icon */}
            <XIcon className="x-mark-icon hidden h-6 w-6" />
          </button>

          <Link
            href={AppRoutes.dashboard}
            className="lg:hidden h-12 flex items-start"
          >
            <Image
              src="/images/swittch.png"
              alt="Logo"
              height={100}
              width={100}
              className="max-h-12 w-auto"
            />
          </Link>
        </div>

        <div>
          <Button variant="outline" onClick={handleSignOut}>
            {t("auth.logout.title")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
