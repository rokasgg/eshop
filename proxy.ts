import { NextResponse, type NextRequest } from "next/server";

// Lithuanian is the default and keeps unprefixed URLs: /shop is served by
// app/[lang]/shop with lang = "lt" via an internal rewrite. English lives at /en/….
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  // An explicit /lt prefix is redundant: send it to the canonical unprefixed URL
  if (pathname === "/lt" || pathname.startsWith("/lt/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  url.pathname = `/lt${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip API routes, Sanity Studio, Next internals and files with an extension
  matcher: ["/((?!api|studio|_next|.*\\..*).*)"],
};
