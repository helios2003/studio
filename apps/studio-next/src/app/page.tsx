import dynamic from 'next/dynamic';
import parseURL from '@/helpers/parser';
import { DocumentInfo } from '@/types'; 
const StudioWrapper = dynamic(() => import('@/components/StudioWrapper'), {ssr: false})
import { Metadata } from 'next';
import ogImage from '@/img/meta-studio-og-image.jpeg';

type Props = {
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const base64Doc = searchParams["base64"];
  let metadata: Metadata = {
    metadataBase: new URL("https://studio-studio-next.vercel.app"),
    openGraph: {
      type: "website",
      title: "AsyncAPI Studio",
      description:
        "Studio for AsyncAPI specification, where you can validate, view preview documentation, and generate templates from AsyncAPI document.",
      url: "https://studio-studio-next.vercel.app",
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
  await generateMetadata({ searchParams });
  return (
    <StudioWrapper />
  )
}
