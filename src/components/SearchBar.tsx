import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { clsx } from 'clsx';

interface SearchBarProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  loading = false,
  placeholder = "Search for books, authors, or topics...",
  className
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  }, [query, loading, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  }, []);

  useEffect(() => {
    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => document.removeEventListener('keydown', handleKeyboardShortcut);
  }, []);

  return (
    <div className={clsx("w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={clsx(
            "relative flex items-center bg-white rounded-xl shadow-lg transition-all duration-200",
            "border-2 border-transparent",
            isFocused && "border-blue-500 shadow-xl",
            loading && "opacity-75"
          )}
        >
          <div className="flex items-center pl-4 pr-2">
            <Search 
              className={clsx(
                "w-5 h-5 transition-colors duration-200",
                isFocused ? "text-blue-500" : "text-gray-400"
              )} 
            />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            className={clsx(
              "flex-1 py-4 px-2 text-gray-900 placeholder-gray-500",
              "bg-transparent border-none outline-none",
              "text-lg font-medium",
              loading && "cursor-not-allowed"
            )}
            autoComplete="off"
            spellCheck="false"
          />

          <div className="flex items-center pr-2">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                disabled={loading}
                className={clsx(
                  "p-2 rounded-lg transition-colors duration-200",
                  "hover:bg-gray-100 focus:bg-gray-100",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                  loading && "cursor-not-allowed opacity-50"
                )}
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
            
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className={clsx(
                "ml-2 px-6 py-2 bg-blue-600 text-white rounded-lg",
                "font-medium transition-all duration-200",
                "hover:bg-blue-700 focus:bg-blue-700",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                "disabled:bg-gray-300 disabled:cursor-not-allowed",
                loading && "bg-blue-400"
              )}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>

        {/* Search suggestions or shortcuts */}
        <div className="mt-2 text-sm text-gray-500 text-center">
          <span className="hidden sm:inline">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">Ctrl+K</kbd> to focus search
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;