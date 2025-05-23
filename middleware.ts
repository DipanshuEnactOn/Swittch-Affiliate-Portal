import { withAuth } from "next-auth/middleware";
import App from "next/app";
import { NextResponse } from "next/server";
import { AppRoutes } from "./utils/routes";

export default withAuth(
  function middleware(req) {
    const isAuthenticated = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (process.env.NODE_ENV === "development" && pathname.includes("_next")) {
      return NextResponse.next();
    }

    // if (pathname.startsWith("/api/auth")) {
    //   return NextResponse.next();
    // }
    // if (pathname.startsWith("/dashboard")) {
    //   console.log("Going to dashboard");
    //   return NextResponse.next();
    // }

    // const isPendingPath = pathname === AppRoutes.auth.pending;
    // const isAuthPath = [
    //   AppRoutes.auth.signIn,
    //   AppRoutes.auth.signUp,
    //   AppRoutes.auth.forgot_password,
    // ].includes(pathname);

    // if (isAuthenticated && isAuthPath) {
    //   return NextResponse.redirect(new URL(AppRoutes.auth.pending, req.url));
    // }

    // if (!isAuthenticated && !isAuthPath && !isPendingPath) {
    //   return NextResponse.redirect(new URL(AppRoutes.auth.signIn, req.url));
    // }

    // return NextResponse.next();
  }
  // {
  //   callbacks: {
  //     authorized: ({ token, req }) => {
  //       if (
  //         req.nextUrl.pathname.startsWith("/api/auth") ||
  //         [AppRoutes.auth.signIn, AppRoutes.auth.signUp].includes(
  //           req.nextUrl.pathname
  //         )
  //       ) {
  //         return true;
  //       }
  //       return !!token;
  //     },
  //   },
  // }
);

export const config = {
  matcher: [
    "/((?!api/auth|_next/|.*\\..*|signin|signup|forgot-password|dashboard|error).*)",
  ],
};
