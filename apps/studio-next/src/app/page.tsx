import { Metadata } from "next";
import dynamic from "next/dynamic";
import parseURL from "@/helpers/parser";
import ogImage from "@/img/meta-studio-og-image.jpeg";
import { DocumentInfo } from "@/types";
import Head from "next/head";
const StudioWrapper = dynamic(() => import("@/components/StudioWrapper"), {
  ssr: false,
});

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const base64Doc = searchParams["base64"];
  let metadata: Metadata = {
    metadataBase: new URL("https://studio-helios2003.netlify.app"),
    openGraph: {
      type: "website",
      title: "AsyncAPI Studio",
      description:
        "Studio for AsyncAPI specification, where you can validate, view preview documentation, and generate templates from AsyncAPI document.",
      url: "https://studio-helios2003.netlify.app",
      images: [
        {
          url: ogImage.src,
          alt: "AsyncAPI default image",
        },
      ],
    },
    twitter: {
      site: "@AsyncAPISpec",
    },
  };
  if (base64Doc) {
    try {
      const ogInfo: DocumentInfo = await parseURL(base64Doc);
      console.log(ogInfo);
      metadata = {
        ...metadata,
        openGraph: {
          ...metadata.openGraph,
          title: ogInfo.title,
          description: ogInfo.description,
          images: [
            {
              url: `https://ogp-studio.vercel.app/api/og?title=${ogInfo.title}&description=${ogInfo.description}&numServers=${ogInfo.numServers}&numChannels=${ogInfo.numChannels}`,
              alt: "AsyncAPI default image",
            },
          ],
        },
        twitter: {
          ...metadata.twitter,
          title: ogInfo.title,
          description: ogInfo.description,
          images: [
            {
              url: `https://ogp-studio.vercel.app/api/og?title=${ogInfo.title}&description=${ogInfo.description}&numServers=${ogInfo.numServers}&numChannels=${ogInfo.numChannels}`,
              alt: "AsyncAPI default image",
            },
          ],
        },
      };
    } catch (error) {
      console.error("Error parsing URL:", error);
    }
  }

  return metadata;
}

export default async function Home({ searchParams }: Props) {
  const metadata = await generateMetadata({ searchParams });
  return (
    <>
      <Head>
        <meta name="description" content={metadata.openGraph?.description} />
        <meta
          property="og:title"
          content={metadata.openGraph?.title?.toString()}
        />
        <meta
          property="og:description"
          content={metadata.openGraph?.description}
        />
        <meta property="og:url" content={metadata.openGraph?.url?.toString()} />
        {/* <meta property="og:image" content={metadata.openGraph?.images?.[0]?.ur.toString()} />
        <meta property="og:image:alt" content={metadata.openGraph?.images?.[0]?.alt} />
        <meta name="twitter:title" content={metadata.twitter?.title} /> */}
        <meta
          name="twitter:description"
          content={metadata.twitter?.description}
        />
        <meta name="twitter:site" content={metadata.twitter?.site} />
      </Head>
      <StudioWrapper />
    </>
  );
}
