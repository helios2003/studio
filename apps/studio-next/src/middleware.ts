import { NextRequest, NextResponse, userAgent } from "next/server";
import crawlers from 'crawler-user-agents';

export async function middleware(request: NextRequest) {

  const searchParams = request.nextUrl.search.split("?")[1];

  if (!searchParams.startsWith("base64") &&!searchParams.startsWith("url")) {
    return NextResponse.next();
  }

  const userAgents = crawlers.map(crawler => crawler.pattern);
  const requestInfo = userAgent(request);
  const res = NextResponse.next();
  
  for (const ua of userAgents) {
    if (requestInfo.ua.toLowerCase().includes(ua.toLowerCase())) {
      const documentURL = request.nextUrl.searchParams.get("url");
      const encodedDocument = request.nextUrl.searchParams.get("base64");
      
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

