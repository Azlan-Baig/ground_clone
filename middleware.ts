import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "ar";

function getLocale(request: NextRequest) {
  return defaultLocale; // Always use defaultLocale for now
}

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent")?.toLowerCase();


  // Separate condition for Cloudflare Health Checks
  if (ua && ua.includes("cloudflare-healthchecks")) {
    // console.log(Bypassing Cloudflare Health Check: ${pathname}); // Optional logging
    //return NextResponse.next(); // Skip rewrite, serve raw path
    return new NextResponse("OK", { status: 200 }); // Return 200 with "OK"
  }

  // Exclude paths that should not have locale logic (e.g., internal and studio paths)
  if (pathname.startsWith("/studio") || pathname.startsWith("/_next") || pathname.startsWith("/api") ) {
    return; // Bypass the middleware for these routes
  }

  // Check if the pathname already includes a locale
//   const pathnameHasLocale = locales.some(
//     // (locale) => pathname.startsWith(/${locale}/) || pathname === /${locale}
//   );

//   // If the pathname has a locale, allow the request through
//   if (pathnameHasLocale) return;

  // If the pathname doesn't have a locale, rewrite to defaultLocale but stay at /
  const locale = getLocale(request);
//   request.nextUrl.pathname = /${locale}${pathname};
//   return NextResponse.rewrite(new URL(/${locale}${pathname}, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and Sanity Studio paths (/studio)
    "/((?!_next|studio|favicon.ico).*)",
  ],
};