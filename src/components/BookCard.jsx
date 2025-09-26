import React, { useState } from 'react'

const BookCard = ({ book }) => {
  const [imageError, setImageError] = useState(false)
  
  // Extract book information
  const title = book.title || 'Unknown Title'
  const authors = book.author_name ? book.author_name.join(', ') : 'Unknown Author'
  const publishDate = book.first_publish_year || 'Unknown'
  const publisher = book.publisher ? book.publisher[0] : null
  const isbn = book.isbn ? book.isbn[0] : null
  const subjects = book.subject ? book.subject.slice(0, 3) : []
  const pageCount = book.number_of_pages_median || null
  
  // Generate cover image URL
  const coverId = book.cover_i
  const coverUrl = coverId && !imageError 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : null

  // Generate Open Library URL
  const bookUrl = `https://openlibrary.org${book.key}`

  return (
    <div className="book-card bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:z-10 relative group">
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
      
      {/* Book Cover */}
      <div className="relative h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-8 h-8 bg-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 right-6 w-6 h-6 bg-purple-200 rounded-full animate-pulse delay-300"></div>
          <div className="absolute top-1/2 right-4 w-4 h-4 bg-pink-200 rounded-full animate-pulse delay-700"></div>
        </div>
        
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-center text-gray-500 relative z-10">
            <div className="text-6xl mb-3 animate-bounce">�</div>
            <p className="text-sm font-medium">No cover available</p>
            <div className="mt-2 flex justify-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        )}
      </div>

      {/* Book Information */}
      <div className="p-6 bg-gradient-to-t from-white to-gray-50 group-hover:from-blue-50 group-hover:to-white transition-all duration-500">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-900 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-700 mb-2 line-clamp-1 group-hover:text-gray-800 transition-colors duration-300">
          <span className="font-semibold text-blue-600">👤 Author:</span> {authors}
        </p>
        
        <p className="text-gray-600 text-sm mb-4 group-hover:text-gray-700 transition-colors duration-300">
          <span className="inline-flex items-center gap-1">
            📅 Published: <span className="font-medium">{publishDate}</span>
          </span>
        </p>

        {/* Additional Information */}
        <div className="space-y-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          {publisher && (
            <p className="flex items-center gap-2">
              <span className="text-purple-500">🏢</span>
              <span className="font-semibold">Publisher:</span> 
              <span className="flex-1">{publisher}</span>
            </p>
          )}
          
          {pageCount && (
            <p className="flex items-center gap-2">
              <span className="text-green-500">📄</span>
              <span className="font-semibold">Pages:</span> 
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs group-hover:bg-blue-100 transition-colors duration-300">{pageCount}</span>
            </p>
          )}
          
          {isbn && (
            <p className="flex items-center gap-2">
              <span className="text-orange-500">🔢</span>
              <span className="font-semibold">ISBN:</span> 
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded group-hover:bg-blue-100 transition-colors duration-300">{isbn}</span>
            </p>
          )}
        </div>

        {/* Subjects/Tags */}
        {subjects.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
              🏷️ CATEGORIES
            </p>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject, index) => (
                <span
                  key={index}
                  className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-gray-200 group-hover:border-blue-200 transition-colors duration-300">
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-sm px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group-hover:animate-pulse"
          >
            <span className="mr-2">📖</span>
            View Details
            <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default BookCard