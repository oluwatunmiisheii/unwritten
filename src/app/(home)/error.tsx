'use client'

export default function Error() {
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Oops! Something Went Wrong</h1>
      <p className="text-gray-600 mb-8">
        There was an issue retrieving the data. Please try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        type="button"
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 flex-shrink-0"
      >
        Retry
      </button>
    </div>
  )
}
