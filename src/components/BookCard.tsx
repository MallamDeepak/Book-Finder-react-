import React from 'react';
import { Book } from '../types/Book';
import { Star, Calendar, User, BookOpen, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface BookCardProps {
  book: Book;
  onClick?: (book: Book) => void;
  className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onClick,
  className 
}) => {
  const { volumeInfo } = book;
  const {
    title,
    authors,
    publishedDate,
    description,
    imageLinks,
    averageRating,
    ratingsCount,
    pageCount,
    categories,
    previewLink
  } = volumeInfo;

  const thumbnail = imageLinks?.thumbnail || imageLinks?.smallThumbnail;
  const publishYear = publishedDate ? new Date(publishedDate).getFullYear() : null;
  const truncatedDescription = description 
    ? description.length > 150 
      ? `${description.substring(0, 150)}...` 
      : description
    : null;

  const handleClick = () => {
    if (onClick) {
      onClick(book);
    }
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewLink) {
      window.open(previewLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300",
        "border border-gray-100 hover:border-gray-200",
        "transform hover:-translate-y-1 cursor-pointer",
        "overflow-hidden group",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={`Cover of ${title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={clsx(
            "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100",
            thumbnail && "hidden"
          )}>
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          
          {/* Preview Link */}
          {previewLink && (
            <button
              onClick={handlePreviewClick}
              className={clsx(
                "absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                "hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
              aria-label="Preview book"
            >
              <ExternalLink className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Book Info */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Title */}
          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Authors */}
          {authors && authors.length > 0 && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <User className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {authors.slice(0, 2).join(', ')}
                {authors.length > 2 && ` +${authors.length - 2} more`}
              </span>
            </div>
          )}

          {/* Publication Year & Page Count */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
            {publishYear && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{publishYear}</span>
              </div>
            )}
            {pageCount && (
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{pageCount} pages</span>
              </div>
            )}
          </div>

          {/* Rating */}
          {averageRating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-700">
                  {averageRating.toFixed(1)}
                </span>
                {ratingsCount && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({ratingsCount.toLocaleString()})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {categories.slice(0, 2).map((category, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                  >
                    {category}
                  </span>
                ))}
                {categories.length > 2 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full font-medium">
                    +{categories.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {truncatedDescription && (
            <p className="text-gray-600 text-sm leading-relaxed flex-1">
              {truncatedDescription}
            </p>
          )}

          {/* Click to view more */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
              Click to view details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;