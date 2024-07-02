import dynamic from 'next/dynamic';
const StudioWrapper = dynamic(() => import('@/components/StudioWrapper'), {ssr: false})
import { Metadata } from 'next';

export default async function Home() {
  return (
    <StudioWrapper />
  )
}
