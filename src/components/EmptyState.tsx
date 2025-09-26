import React from 'react';
import { Search, BookOpen, Sparkles, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

interface EmptyStateProps {
  variant?: 'initial' | 'noResults' | 'error';
  searchQuery?: string;
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
}

const POPULAR_SEARCHES = [
  'Harry Potter',
  'The Great Gatsby',
  'To Kill a Mockingbird',
  'Pride and Prejudice',
  '1984',
  'The Catcher in the Rye',
  'Lord of the Rings',
  'Jane Austen'
];

const TRENDING_TOPICS = [
  'Science Fiction',
  'Mystery',
  'Romance',
  'Biography',
  'Self Help',
  'History'
];

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant = 'initial',
  searchQuery,
  onSuggestionClick,
  className
}) => {
  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
  };

  if (variant === 'noResults') {
    return (
      <div className={clsx("text-center py-12 px-4", className)}>
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No books found
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? `We couldn't find any books matching "${searchQuery}". Try different keywords or check your spelling.`
                : "We couldn't find any books matching your search."
              }
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Try these popular searches:</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {POPULAR_SEARCHES.slice(0, 4).map((search) => (
                  <button
                    key={search}
                    onClick={() => handleSuggestionClick(search)}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'error') {
    return (
      <div className={clsx("text-center py-12 px-4", className)}>
        <div className="max-w-md mx-auto">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">
            We're having trouble loading books right now. Please try again in a moment.
          </p>
        </div>
      </div>
    );
  }

  // Initial state
  return (
    <div className={clsx("text-center py-16 px-4", className)}>
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative mb-6">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <BookOpen className="w-12 h-12 text-blue-600" />
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Search through millions of books from Google Books. Find classics, bestsellers, 
              and hidden gems across every genre imaginable.
            </p>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Popular Searches</h3>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {POPULAR_SEARCHES.map((search) => (
              <button
                key={search}
                onClick={() => handleSuggestionClick(search)}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Browse by Category */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TRENDING_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSuggestionClick(topic)}
                className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-800 rounded-lg hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-800 mb-3">Search Tips</h4>
          <div className="text-sm text-gray-600 space-y-2 text-left max-w-md mx-auto">
            <p>• Search by title, author, or ISBN</p>
            <p>• Use quotes for exact phrases: "The Great Gatsby"</p>
            <p>• Try broader terms if you don't find what you're looking for</p>
            <p>• Browse categories to discover new books</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;