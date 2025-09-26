import React from 'react'
import BookCard from './BookCard'
import LoadingSpinner from './LoadingSpinner'
import Pagination from './Pagination'

const BookResults = ({ books, loading, error, totalBooks, currentPage, onPageChange }) => {
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-medium mb-2">Oops! Something went wrong</div>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!books.length) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">Ready to find your next book?</h3>
        <p className="text-gray-500">Use the search form above to discover amazing books!</p>
      </div>
    )
  }

  const booksPerPage = 20
  const totalPages = Math.ceil(totalBooks / booksPerPage)

  return (
    <div>
      {/* Results summary */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          Found <span className="font-semibold text-blue-600">{totalBooks.toLocaleString()}</span> books
        </div>
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages.toLocaleString()}
        </div>
      </div>

      {/* Books grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8 book-grid">
        {books.map((book, index) => (
          <BookCard key={book.key || index} book={book} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

export default BookResults