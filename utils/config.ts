import {
  CreditCard,
  FileText,
  LayoutDashboard,
  LinkIcon,
  Settings,
} from "lucide-react";
import { AppRoutes } from "./routes";

export const Config = {
  env: {
    app: {
      app_url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      api_url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
      auth_url:
        process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3002/auth",
      jwt_login_expiry: 3600,
      sidebar: [
        {
          name: "Dashboard",
          href: AppRoutes.dashboard,
          icon: LayoutDashboard,
        },
        {
          name: "Links",
          href: "/links",
          icon: LinkIcon,
        },
        {
          name: "Payouts",
          href: "/payouts",
          icon: CreditCard,
        },
        {
          name: "All Transactions",
          href: "/transactions",
          icon: FileText,
        },
        {
          name: "Settings",
          href: "/settings",
          icon: Settings,
        },
      ],
    },
  },
};
