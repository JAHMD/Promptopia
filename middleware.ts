import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("next-auth.session-token")?.value;
	const isProtected = request.nextUrl.pathname.endsWith("/profile");
	if (isProtected && !token) {
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: ["/", "/profile", "/profile/:path*"],
};
