'use client'
import { useRouter } from 'next/navigation'

export const SearchForm = () => {
  const router = useRouter()

  async function search(formData: FormData) {
    const searchQuery = formData.get('search') as string
    router.push(`/?search=${encodeURIComponent(searchQuery)}`, { scroll: false })
  }

  return (
    <form className="flex gap-x-4" action={search}>
      <input
        id="search"
        name="search"
        type="text"
        required
        aria-label="Search"
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex-shrink-0"
      >
        Search
      </button>
    </form>
  )
}
