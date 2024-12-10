'use client'

import { useState } from 'react'
import { ImageResult } from '@/lib/unsplash/unsplash.model'
import Image from 'next/image'
import React from 'react'
import { getImages } from '@/lib/unsplash/unsplash.service'

interface ImageGridProps {
  initialImages: ImageResult['results']
  searchQuery: string
}

export const ImageGrid = ({ initialImages, searchQuery }: ImageGridProps) => {
  const [images, setImages] = useState(initialImages)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = async () => {
    if (isLoading) return

    setIsLoading(true)
    const nextPage = page + 1

    try {
      const result = await getImages(nextPage, searchQuery)

      if (result.results.length > 0) {
        setImages((prev) => [...prev, ...result.results])
        setPage(nextPage)
        setHasMore(nextPage < result.total_pages)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.warn(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-20">
      <h5 className="text-2xl mb-8">
        Showing results for{' '}
        <span className="font-bold border-b border-dotted border-black capitalize">
          {searchQuery}
        </span>
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {images.map((image, index) => (
          <div
            className="flex w-full flex-col items-center border border-gray-200 overflow-hidden rounded-lg bg-zinc-100 shadow-sm"
            key={image.id}
          >
            <div className="w-full relative h-52">
              <Image
                src={image.urls.regular}
                priority={index < 10}
                alt={image.description || image.alt_description || image.slug}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-top"
              />
              <div className="bg-white shadow rounded-full absolute text-[11px] px-2.5 py-1 right-3 top-3">
                ❤️ {image.likes}
              </div>
            </div>
            <div className="p-5 flex items-between w-full items-center justify-between">
              <div className="size-8 rounded-full border-2 border-zinc-800 flex-shrink-0">
                <Image
                  src={image.user.profile_image.large}
                  alt={image.user.username}
                  height={32}
                  width={32}
                  className="rounded-full"
                />
              </div>
              <p className="text-sm truncate pl-2">{image.user.username}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
