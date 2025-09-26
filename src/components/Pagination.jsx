import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5
  
  // Calculate the range of pages to show
  const getPageRange = () => {
    const halfRange = Math.floor(maxVisiblePages / 2)
    let start = Math.max(1, currentPage - halfRange)
    let end = Math.min(totalPages, start + maxVisiblePages - 1)
    
    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1)
    }
    
    return { start, end }
  }

  const { start, end } = getPageRange()
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* First page + ellipsis */}
      {start > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            1
          </button>
          {start > 2 && (
            <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? 'text-white bg-blue-600 border border-blue-600'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page + ellipsis */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination