import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const isDev = process.env.NODE_ENV === "development";

    // In development, Next.js/Turbopack requires unsafe-inline and unsafe-eval
    // for HMR, hot reload scripts, and hydration bootstrapping.
    // In production, you can tighten this once nonce is threaded into layout.tsx.
    const scriptSrc = isDev
        ? `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
        : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;

    const cspHeader = [
        `default-src 'self'`,
        scriptSrc,
        `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
        `font-src 'self' data: https://fonts.gstatic.com`,
        `img-src 'self' data: https: blob:`,
        `media-src 'self' blob:`,
        `connect-src 'self' https://api.web3forms.com https://vitals.vercel-insights.com${isDev ? " ws://localhost:* wss://localhost:*" : ""}`,
        `worker-src 'self' blob:`,
        `frame-ancestors 'none'`,
    ].join("; ");

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", cspHeader);

    const response = NextResponse.next({
        request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", cspHeader);

    return response;
}

export const config = {
    matcher: [
        {
            source: "/((?!_next/static|_next/image|favicon.ico|logo.png|docs/).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};
