import { Suspense } from 'react'
import Image from 'next/image'
import { ImageGrid } from './_components/image-grid/image-grid'
import { SearchForm } from './_components/search-form/search-form'
import { getImages } from '@/lib/unsplash/unsplash.service'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const searchQuery = params.search ? (params.search as string) : 'Manchester'
  const images = await getImages(1, searchQuery)

  return (
    <section>
      <SearchForm />
      <Suspense fallback={<div className="text-5xl">Loading...</div>}>
        {images.total === 0 ? (
          <div className="bg-white shadow border border-gray-200 rounded-lg flex flex-col items-center mt-12 py-12">
            <Image src="/no-results.svg" alt="No results found" width={200} height={200} />
            <h1 className="mt-6 text-xl">
              No results found for{' '}
              <span className="font-bold border-b border-dotted border-black">{searchQuery}</span>
            </h1>
          </div>
        ) : (
          <ImageGrid initialImages={images.results} searchQuery={searchQuery} key={searchQuery} />
        )}
      </Suspense>
    </section>
  )
}
