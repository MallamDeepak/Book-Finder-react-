import { useState, useCallback, useRef } from 'react';
import { Book, SearchParams } from '../types/Book';
import { bookService } from '../services/bookService';

interface UseBooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  hasMore: boolean;
  currentQuery: string;
}

interface UseBooksReturn extends UseBooksState {
  searchBooks: (query: string, reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  clearBooks: () => void;
  retrySearch: () => Promise<void>;
}

export const useBooks = (): UseBooksReturn => {
  const [state, setState] = useState<UseBooksState>({
    books: [],
    loading: false,
    error: null,
    totalItems: 0,
    hasMore: false,
    currentQuery: ''
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const currentSearchParams = useRef<SearchParams>({ query: '' });

  const updateState = useCallback((updates: Partial<UseBooksState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const searchBooks = useCallback(async (query: string, reset = true) => {
    if (!query.trim()) {
      updateState({ error: 'Please enter a search term' });
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const searchParams: SearchParams = {
      query: query.trim(),
      startIndex: reset ? 0 : state.books.length,
      maxResults: 12,
      orderBy: 'relevance',
      printType: 'books'
    };

    currentSearchParams.current = { ...searchParams, startIndex: 0 };

    updateState({
      loading: true,
      error: null,
      ...(reset && { books: [], totalItems: 0 }),
      currentQuery: query.trim()
    });

    try {
      const response = await bookService.searchBooks(searchParams);
      
      const newBooks = response.items || [];
      const totalItems = response.totalItems || 0;
      
      updateState({
        books: reset ? newBooks : [...state.books, ...newBooks],
        totalItems,
        hasMore: (reset ? newBooks.length : state.books.length + newBooks.length) < totalItems,
        loading: false,
        error: null
      });
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        updateState({
          loading: false,
          error: error.message
        });
      }
    }
  }, [state.books.length, updateState]);

  const loadMore = useCallback(async () => {
    if (state.loading || !state.hasMore || !state.currentQuery) return;

    await searchBooks(state.currentQuery, false);
  }, [state.loading, state.hasMore, state.currentQuery, searchBooks]);

  const clearBooks = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    setState({
      books: [],
      loading: false,
      error: null,
      totalItems: 0,
      hasMore: false,
      currentQuery: ''
    });
  }, []);

  const retrySearch = useCallback(async () => {
    if (state.currentQuery) {
      await searchBooks(state.currentQuery, true);
    }
  }, [state.currentQuery, searchBooks]);

  return {
    ...state,
    searchBooks,
    loadMore,
    clearBooks,
    retrySearch
  };
};

export default useBooks;