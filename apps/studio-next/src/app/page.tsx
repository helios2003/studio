import { Metadata } from 'next';
import parseURL from '@/helpers/parser';
import ogImage from '@/img/meta-studio-og-image.jpeg';
import { DocumentInfo } from '@/types';
import StudioWrapper from '@/components/StudioWrapper';

type Props = {
  searchParams: { [key: string]: string | undefined }
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const base64Doc = searchParams['base64'];
  let metadata: Metadata = {
    metadataBase: new URL('https://studio-helios2003.netlify.app'),
    openGraph: {
      type: 'website',
      title: 'AsyncAPI Studio',
      description: 'Studio for AsyncAPI specification, where you can validate, view preview documentation, and generate templates from AsyncAPI document.',
      url: 'https://studio-helios2003.netlify.app',
      images: [
        {
          url: ogImage.src,
          alt: 'AsyncAPI default image',
        },
      ],
    },
    twitter: {
      site: '@AsyncAPISpec',
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
        },
        twitter: {
          ...metadata.twitter,
          title: ogInfo.title,
          description: ogInfo.description
        }
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
    <StudioWrapper />
  )
}
