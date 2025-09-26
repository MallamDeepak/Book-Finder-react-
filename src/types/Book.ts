export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
  readingModes?: {
    text: boolean;
    image: boolean;
  };
  pageCount?: number;
  printType?: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  panelizationSummary?: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface SaleInfo {
  country?: string;
  saleability?: string;
  isEbook?: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
  buyLink?: string;
  offers?: Array<{
    finskyOfferType: number;
    listPrice: {
      amountInMicros: number;
      currencyCode: string;
    };
    retailPrice: {
      amountInMicros: number;
      currencyCode: string;
    };
  }>;
}

export interface AccessInfo {
  country?: string;
  viewability?: string;
  embeddable?: boolean;
  publicDomain?: boolean;
  textToSpeechPermission?: string;
  epub?: {
    isAvailable: boolean;
    acsTokenLink?: string;
  };
  pdf?: {
    isAvailable: boolean;
    acsTokenLink?: string;
  };
  webReaderLink?: string;
  accessViewStatus?: string;
  quoteSharingAllowed?: boolean;
}

export interface Book {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo?: SaleInfo;
  accessInfo?: AccessInfo;
  searchInfo?: {
    textSnippet: string;
  };
}

export interface BooksResponse {
  kind: string;
  totalItems: number;
  items: Book[];
}

export interface SearchParams {
  query: string;
  startIndex?: number;
  maxResults?: number;
  orderBy?: 'relevance' | 'newest';
  printType?: 'all' | 'books' | 'magazines';
  filter?: 'partial' | 'full' | 'free-ebooks' | 'paid-ebooks' | 'ebooks';
}