import { NextRequest, NextResponse } from "next/server";
import parseURL from "@/helpers/parser";
import { DocumentInfo } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams.get('base64');
    if (!searchParams) return new NextResponse(null, { status: 200 });
    const info: DocumentInfo = await parseURL(searchParams);
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