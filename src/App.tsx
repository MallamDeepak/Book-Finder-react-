import React, { useState, useCallback } from 'react';
import { Book } from './types/Book';
import { useBooks } from './hooks/useBooks';
import SearchBar from './components/SearchBar';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import LoadingSpinner, { BookCardSkeleton } from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import { BookOpen, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';

function App() {
  const {
    books,
    loading,
    error,
    totalItems,
    hasMore,
    currentQuery,
    searchBooks,
    loadMore,
    clearBooks,
    retrySearch
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle book selection
  const handleBookClick = useCallback((book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedBook(null);
  }, []);

  // Handle search
  const handleSearch = useCallback(async (query: string) => {
    await searchBooks(query);
  }, [searchBooks]);

  // Handle suggestion clicks from empty state
  const handleSuggestionClick = useCallback(async (suggestion: string) => {
    await searchBooks(suggestion);
  }, [searchBooks]);

  // Handle load more
  const handleLoadMore = useCallback(async () => {
    if (!loading && hasMore) {
      await loadMore();
    }
  }, [loading, hasMore, loadMore]);

  // Handle scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle scroll events for scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Render loading skeletons
  const renderLoadingSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </div>
  );

  // Render books grid
  const renderBooksGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={handleBookClick}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Book Finder</h1>
            </div>
            {books.length > 0 && (
              <button
                onClick={clearBooks}
                className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
              >
                Clear Results
              </button>
            )}
          </div>
          
          <SearchBar
            onSearch={handleSearch}
            loading={loading}
            placeholder="Search for books, authors, or topics..."
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        {currentQuery && !loading && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {error ? (
                `Search failed for "${currentQuery}"`
              ) : books.length > 0 ? (
                <>
                  Found {totalItems.toLocaleString()} results for "{currentQuery}"
                  {books.length < totalItems && (
                    <span className="text-gray-500 font-normal">
                      {' '}(showing {books.length})
                    </span>
                  )}
                </>
              ) : (
                `No results found for "${currentQuery}"`
              )}
            </h2>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mb-8">
            <ErrorMessage
              message={error}
              onRetry={retrySearch}
              variant={error.includes('network') || error.includes('connection') ? 'network' : 'default'}
            />
          </div>
        )}

        {/* Content */}
        {loading && books.length === 0 ? (
          // Initial loading
          <div className="space-y-8">
            <LoadingSpinner
              size="lg"
              variant="books"
              message="Searching for books..."
            />
            {renderLoadingSkeletons()}
          </div>
        ) : books.length > 0 ? (
          // Books results
          <div className="space-y-8">
            {renderBooksGrid()}
            
            {/* Load More / Loading More */}
            {hasMore && (
              <div className="text-center">
                {loading ? (
                  <LoadingSpinner
                    size="md"
                    message="Loading more books..."
                  />
                ) : (
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  >
                    Load More Books
                  </button>
                )}
              </div>
            )}
            
            {/* End of results */}
            {!hasMore && !loading && books.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  You've reached the end of the results for "{currentQuery}"
                </p>
              </div>
            )}
          </div>
        ) : !error ? (
          // Empty states
          <EmptyState
            variant={currentQuery ? 'noResults' : 'initial'}
            searchQuery={currentQuery}
            onSuggestionClick={handleSuggestionClick}
          />
        ) : null}
      </main>

      {/* Book Modal */}
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={clsx(
            "fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg",
            "hover:bg-blue-700 focus:bg-blue-700 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "z-40"
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default App;