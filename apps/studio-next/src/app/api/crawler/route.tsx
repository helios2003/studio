import { NextRequest, NextResponse } from "next/server";
import parseURL from "@/helpers/parser";
import { DocumentInfo } from "@/types";
import ogImage from '@/img/meta-studio-og-image.jpeg';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams.get('base64');
    if (!searchParams) return new NextResponse(null, { status: 200 });

    const info: DocumentInfo | null = await parseURL(searchParams);

    if (!info) {
      const crawlerInfo = `
       <!DOCTYPE html>
       <html lang="en">
       <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>"AsyncAPI Studio"</title>
        <meta property="og:title" content="AsyncAPI Studio" />
        <meta property="og:description" content="Studio for AsyncAPI specification, where you can validate, view preview documentation, and generate templates from AsyncAPI document." />
        <meta property="og:url" content="https://studio-next.netlify.app" />
        <meta property="og:image" content="https://raw.githubusercontent.com/asyncapi/studio/master/apps/studio-next/public/img/meta-studio-og-image.jpeg" />
      `
       return new NextResponse(crawlerInfo, {
        headers: {
          'Content-Type': 'text/html',
        },
      })
    }

    let ogImageParams = new URLSearchParams();

    if (info.title !== undefined) {
      ogImageParams.append('title', info.title.toString());
    }
    if (info.description !== undefined) {
      ogImageParams.append('description', info.description.toString());
    }
    if (info.numServers !== undefined) {
      ogImageParams.append('numServers', info.numServers.toString());
    }
    if (info.numChannels !== undefined) {
      ogImageParams.append('numChannels', info.numChannels.toString());
    }
    const ogImageurl = `https://ogp-studio.netlify.app/api/og?${ogImageParams.toString()}`;

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
        <meta property="og:image" content=${ogImageurl} />
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