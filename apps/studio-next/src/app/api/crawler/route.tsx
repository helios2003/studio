import { NextRequest, NextResponse } from "next/server";
import parseURL from "@/helpers/parser";
import { DocumentInfo } from "@/types";
import fetch from "node-fetch";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams.get('base64');
    if (!searchParams) return new NextResponse(null, { status: 200 });
    const info: DocumentInfo = await parseURL(searchParams);

    const ogImageurl = `https://ogp-studio.vercel.app/api/og?title=${info.title}&description=${info.description}&numServers=${info.numServers}&numChannels=${info.numChannels}`;
    const ogImage = await fetch(ogImageurl);
    const ogImageBuffer = await ogImage.arrayBuffer();
    const ogImageBase64 = Buffer.from(ogImageBuffer).toString('base64');

    const crawlerInfo = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${info.title}</title>
        ${info.title ? `<meta property="og:title" content="${info.title}" />` : ''}
        ${info.description ? `<meta property="og:description" content="${info.description}" />` : ''}
        <meta property="og:image" content="data:image/png;base64,${ogImageBase64}" />
      </head>
      </html>
    `;

    return new NextResponse(crawlerInfo, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (err) {
    console.error('Error parsing URL:', err);
    return new NextResponse("Not a valid URL", { status: 500 });
  }
}