import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedRoutes = [
  "/bonus",
  "/cashout",
  "/cashout-wallet",
  "/company",
  "/home",
  "/incentive",
  "/mine",
  "/products",
  "/recharge",
  "/records",
  "/reset-password",
  "/team",
  "/work",
];

const authPages = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("susyr7q3ycugfWDFF")?.value;
  const { pathname } = req.nextUrl;

  // 1️⃣ Block access to protected routes if not logged in
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      jwtDecode(token);
      // Valid token → continue
      return NextResponse.next();
    } catch (err) {
      console.error("Invalid token:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 2️⃣ Block access to auth pages if already logged in
  if (authPages.some(route => pathname.startsWith(route))) {
    if (token) {
      try {
        jwtDecode(token);
        // Already logged in → redirect to dashboard
        return NextResponse.redirect(new URL("/home", req.url));
      } catch {
        // Invalid token → clear it and continue to auth page
        const res = NextResponse.next();
        res.cookies.delete("susyr7q3ycugfWDFF");
        return res;
      }
    }
  }

  // 3️⃣ Default: allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/bonus/:path*",
    "/cashout/:path*",
    "/cashout-wallet/:path*",
    "/company/:path*",
    "/home/:path*",
    "/incentive/:path*",
    "/mine/:path*",
    "/products/:path*",
    "/recharge/:path*",
    "/records/:path*",
    "/reset-password/:path*",
    "/team/:path*",
    "/work/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
}

