import { NextRequest, NextResponse, userAgent } from "next/server";
import crawlers from 'crawler-user-agents';

export async function middleware(request: NextRequest) {
  const userAgents = crawlers.map(crawler => crawler.pattern);
  const requestInfo = userAgent(request);
  const res = NextResponse.next();
  for (const ua of userAgents) {
    if (requestInfo.ua.toLowerCase().includes(ua.toLowerCase())) {
      const encodedDocument = request.nextUrl.searchParams.get("base64");
      const documentURL = request.nextUrl.searchParams.get("url");
      if (!encodedDocument && !documentURL) {
        return res;
      }
      if (encodedDocument) {
        return NextResponse.rewrite(new URL(`/api/crawler?base64=${encodedDocument}`, request.url));
      }
      if (documentURL) {
        return NextResponse.rewrite(new URL(`/api/crawler?url=${documentURL}`, request.url));
      }
    }
  }
  return res;
}

export const config = {
  matcher: ['/:base64', '/:url'],
}
