import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuthenticated = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // Skip middleware for NextAuth API routes
    if (pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const isPendingPath = pathname === "/pending";
    const isAuthPath = ["/signin", "/signup"].includes(pathname);

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && isAuthPath) {
      return NextResponse.redirect(new URL("/pending", req.url));
    }

    // Redirect unauthenticated users to signin (except for auth pages and pending)
    if (!isAuthenticated && !isAuthPath && !isPendingPath) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Always allow access to auth pages and API routes
        if (
          req.nextUrl.pathname.startsWith("/api/auth") ||
          ["/signin", "/signup"].includes(req.nextUrl.pathname)
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
