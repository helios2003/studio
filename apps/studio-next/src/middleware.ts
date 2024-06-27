import { NextRequest, NextResponse, userAgent } from "next/server";
import parseURL from "./helpers/parser";
import { DocumentInfo } from "./types";

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
      return NextResponse.redirect(new URL(`https://studio-crawler-redirect.vercel.app/api?base64=${encodedDocument}`, request.url));
    }
  }
  return res;
}
