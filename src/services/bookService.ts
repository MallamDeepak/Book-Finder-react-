import axios from 'axios';
import { BooksResponse, SearchParams } from '../types/Book';

const BASE_URL = 'https://www.googleapis.com/books/v1';
const DEFAULT_MAX_RESULTS = 12;

class BookService {
  private apiKey: string | null = null;

  constructor() {
    // You can add your Google Books API key here for higher rate limits
    // this.apiKey = 'YOUR_API_KEY';
  }

  async searchBooks(params: SearchParams): Promise<BooksResponse> {
    try {
      const {
        query,
        startIndex = 0,
        maxResults = DEFAULT_MAX_RESULTS,
        orderBy = 'relevance',
        printType = 'books',
        filter
      } = params;

      if (!query.trim()) {
        throw new Error('Search query cannot be empty');
      }

      const searchParams = new URLSearchParams({
        q: query.trim(),
        startIndex: startIndex.toString(),
        maxResults: maxResults.toString(),
        orderBy,
        printType
      });

      if (filter) {
        searchParams.append('filter', filter);
      }

      if (this.apiKey) {
        searchParams.append('key', this.apiKey);
      }

      const response = await axios.get<BooksResponse>(
        `${BASE_URL}/volumes?${searchParams.toString()}`,
        {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        if (error.response?.status === 403) {
          throw new Error('API access forbidden. Please check your API key.');
        }
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout. Please check your internet connection.');
        }
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch books');
      }
      throw new Error('An unexpected error occurred while searching for books');
    }
  }

  async getBookById(bookId: string) {
    try {
      const searchParams = new URLSearchParams();
      
      if (this.apiKey) {
        searchParams.append('key', this.apiKey);
      }

      const response = await axios.get(
        `${BASE_URL}/volumes/${bookId}?${searchParams.toString()}`,
        {
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error('Book not found');
        }
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch book details');
      }
      throw new Error('An unexpected error occurred while fetching book details');
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export const bookService = new BookService();
export default bookService;