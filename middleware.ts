import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppRoutes } from "./utils/routes";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // console.log(`Middleware triggered for path: ${pathname}`);

  const skipPaths = [
    "/_next",
    "/api/",
    "/favicon.ico",
    "/static/",
    "/public/",
    "/.well-known/",
  ];

  if (skipPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const authPaths = {
    signIn: AppRoutes.auth.signIn,
    signUp: AppRoutes.auth.signUp,
    forgotPassword: AppRoutes.auth.forgot_password,
    pending: AppRoutes.auth.pending,
  };

  const isAuthPath = [
    authPaths.signIn,
    authPaths.signUp,
    authPaths.forgotPassword,
  ].includes(pathname);

  if (!token) {
    if (isAuthPath) return NextResponse.next();
    return NextResponse.redirect(new URL(authPaths.signIn, req.url));
  }

  if (isAuthPath) {
    // console.log(
    //   `User is authenticated, redirecting from auth path: ${pathname}`
    // );
    return NextResponse.redirect(new URL(AppRoutes.dashboard, req.url));
  }

  if (pathname === "/") {
    // console.log(
    //   `User is authenticated, redirecting from auth path: ${pathname}`
    // );
    return NextResponse.redirect(new URL(AppRoutes.dashboard, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
