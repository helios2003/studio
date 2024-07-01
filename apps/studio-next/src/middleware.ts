import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(request: NextRequest) {
  const userAgents = [
    "redditbot",
    "facebookexternalhit",
    "Slackbot",
    "Twitterbot",
    "whatsapp",
  ];
  const requestInfo = userAgent(request);
  const res = NextResponse.next();
  for (const ua of userAgents) {
    if (requestInfo.ua.toLowerCase().includes(ua.toLowerCase())) {
      const encodedDocument = request.nextUrl.searchParams.get("base64");
      if (!encodedDocument) {
        return res;
      }
      //const redirectService = `https://studio-crawler-redirect.vercel.app/api?title=${info.title}&description=${info.description}`;
      return NextResponse.rewrite(new URL(`/api/crawler/base64=${encodedDocument}`, request.url));
    }
  }
  return res;
}

export const config = {
    matcher: ['/:base64'],
}