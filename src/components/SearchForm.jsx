import React, { useState, useEffect } from 'react'

const SearchForm = ({ onResults, onLoading, onError, onTotalBooks, onCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('title')
  const [searchHistory, setSearchHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  const searchBooks = async (query, type, page = 1) => {
    if (!query.trim()) {
      onError('Please enter a search term')
      return
    }

    onLoading(true)
    onError('')
    onCurrentPage(page)

    try {
      let url = 'https://openlibrary.org/search.json?'
      const params = new URLSearchParams()
      
      // Handle different search types
      switch (type) {
        case 'title':
          params.append('title', query)
          break
        case 'author':
          params.append('author', query)
          break
        case 'isbn':
          params.append('isbn', query)
          break
        case 'subject':
          params.append('subject', query)
          break
        case 'publisher':
          params.append('publisher', query)
          break
        default:
          params.append('q', query)
      }
      
      params.append('page', page.toString())
      params.append('limit', '20')
      
      url += params.toString()

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }

      const data = await response.json()
      
      if (data.docs && data.docs.length > 0) {
        onResults(data.docs)
        onTotalBooks(data.numFound || 0)
      } else {
        onResults([])
        onTotalBooks(0)
        onError('No books found. Try different search terms.')
      }
    } catch (err) {
      onError('Failed to search books. Please try again.')
      onResults([])
      onTotalBooks(0)
    } finally {
      onLoading(false)
    }
  }

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('bookSearchHistory')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save search to history
  const saveToHistory = (query, type) => {
    const newSearch = { query, type, timestamp: Date.now() }
    const updatedHistory = [
      newSearch,
      ...searchHistory.filter(item => !(item.query === query && item.type === type))
    ].slice(0, 10) // Keep only last 10 searches
    
    setSearchHistory(updatedHistory)
    localStorage.setItem('bookSearchHistory', JSON.stringify(updatedHistory))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      saveToHistory(searchQuery, searchType)
      searchBooks(searchQuery, searchType)
      setShowHistory(false)
    }
  }

  const handleHistorySearch = (historyItem) => {
    setSearchQuery(historyItem.query)
    setSearchType(historyItem.type)
    searchBooks(historyItem.query, historyItem.type)
    setShowHistory(false)
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('bookSearchHistory')
  }

  return (
    <div className="search-form-container bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl border border-white/50 backdrop-blur-sm p-8 mb-10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-8 w-16 h-16 bg-blue-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-12 w-12 h-12 bg-purple-300 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 left-8 w-8 h-8 bg-pink-300 rounded-full animate-pulse delay-700"></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold gradient-text flex items-center justify-center gap-3">
            <span className="text-3xl">🔍</span>
            Discover Amazing Books
          </h2>
          <p className="text-gray-600 mt-2">Search through millions of books worldwide</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-lg">📚</span>
              Search for books
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowHistory(searchHistory.length > 0)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                placeholder="Enter book title, author, ISBN..."
                className="search-input w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg shadow-inner"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Search History Dropdown */}
            {showHistory && searchHistory.length > 0 && (
              <div className="history-dropdown absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span>🕒</span>
                    Recent Searches
                  </h3>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleHistorySearch(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border-b border-gray-50 last:border-b-0 group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                            {item.query}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                            {item.type} • {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-56">
            <label htmlFor="searchType" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span className="text-lg">🎯</span>
              Search by
            </label>
            <div className="relative">
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="search-select w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg appearance-none cursor-pointer shadow-inner"
              >
                <option value="title">📖 Title</option>
                <option value="author">👤 Author</option>
                <option value="isbn">🔢 ISBN</option>
                <option value="subject">🏷️ Subject</option>
                <option value="publisher">🏢 Publisher</option>
                <option value="general">🌐 General</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            type="submit"
            className="search-button relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 text-lg group"
          >
            <span className="text-xl group-hover:animate-bounce">🚀</span>
            Search Books
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          {searchHistory.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="animate-pulse">💡</span>
              <span>{searchHistory.length} recent searches saved</span>
            </div>
          )}
        </div>
      </form>
      
      {/* Search Statistics and Tips */}
      <div className="mt-8 pt-6 border-t border-gray-200/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-semibold text-gray-700">Smart Search</p>
            <p className="text-xs text-gray-500">AI-powered results</p>
          </div>
          <div className="stat-card text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm font-semibold text-gray-700">Instant Results</p>
            <p className="text-xs text-gray-500">Lightning fast search</p>
          </div>
          <div className="stat-card text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <div className="text-2xl mb-2">🌍</div>
            <p className="text-sm font-semibold text-gray-700">Global Library</p>
            <p className="text-xs text-gray-500">Millions of books</p>
          </div>
        </div>
        
        {searchHistory.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>💡</span>
              Start searching to build your personal history
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchForm