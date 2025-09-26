import React, { useEffect } from 'react';
import { Book } from '../types/Book';
import { 
  X, 
  Star, 
  Calendar, 
  User, 
  BookOpen, 
  Globe, 
  ExternalLink,
  ShoppingCart,
  Eye,
  Info
} from 'lucide-react';
import { clsx } from 'clsx';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ 
  book, 
  isOpen, 
  onClose 
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const { volumeInfo, saleInfo, accessInfo } = book;
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    imageLinks,
    averageRating,
    ratingsCount,
    pageCount,
    categories,
    language,
    previewLink,
    infoLink,
    industryIdentifiers
  } = volumeInfo;

  const thumbnail = imageLinks?.large || imageLinks?.medium || imageLinks?.thumbnail || imageLinks?.smallThumbnail;
  const publishYear = publishedDate ? new Date(publishedDate).getFullYear() : null;
  const isbn = industryIdentifiers?.find(id => id.type === 'ISBN_13' || id.type === 'ISBN_10');

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="flex flex-col lg:flex-row">
            {/* Book Cover */}
            <div className="lg:w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={`Cover of ${title}`}
                    className="w-full h-auto rounded-lg shadow-lg"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="lg:w-2/3 p-8">
              {/* Title and Authors */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {title}
                </h1>
                {authors && authors.length > 0 && (
                  <div className="flex items-center text-gray-600 text-lg mb-2">
                    <User className="w-5 h-5 mr-2" />
                    <span>{authors.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {averageRating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-yellow-50 px-3 py-2 rounded-lg">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                    <span className="font-semibold text-gray-800">
                      {averageRating.toFixed(1)}
                    </span>
                    {ratingsCount && (
                      <span className="text-gray-600 ml-2">
                        ({ratingsCount.toLocaleString()} reviews)
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Book Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {publisher && (
                  <div className="flex items-center text-gray-600">
                    <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Publisher:</strong> {publisher}
                    </span>
                  </div>
                )}
                {publishYear && (
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Published:</strong> {publishYear}
                    </span>
                  </div>
                )}
                {pageCount && (
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Pages:</strong> {pageCount}
                    </span>
                  </div>
                )}
                {language && (
                  <div className="flex items-center text-gray-600">
                    <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <strong>Language:</strong> {language.toUpperCase()}
                    </span>
                  </div>
                )}
                {isbn && (
                  <div className="flex items-center text-gray-600 md:col-span-2">
                    <span className="text-sm">
                      <strong>ISBN:</strong> {isbn.identifier}
                    </span>
                  </div>
                )}
              </div>

              {/* Categories */}
              {categories && categories.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                  <div 
                    className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                {previewLink && (
                  <button
                    onClick={() => openLink(previewLink)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                )}
                
                {saleInfo?.buyLink && (
                  <button
                    onClick={() => openLink(saleInfo.buyLink!)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Book
                    {saleInfo.listPrice && (
                      <span className="ml-2 font-semibold">
                        {saleInfo.listPrice.currencyCode} {saleInfo.listPrice.amount}
                      </span>
                    )}
                  </button>
                )}
                
                {infoLink && (
                  <button
                    onClick={() => openLink(infoLink)}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    More Info
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;