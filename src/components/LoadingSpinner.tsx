import React from 'react';
import { Loader2, BookOpen } from 'lucide-react';
import { clsx } from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'books' | 'pulse';
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'spinner',
  message,
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const containerSizeClasses = {
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  if (variant === 'books') {
    return (
      <div className={clsx("flex flex-col items-center justify-center", containerSizeClasses[size], className)}>
        <div className="relative">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={clsx(
                  "bg-blue-600 rounded-sm animate-pulse",
                  size === 'sm' && "w-2 h-6",
                  size === 'md' && "w-3 h-8",
                  size === 'lg' && "w-4 h-10",
                  size === 'xl' && "w-5 h-12"
                )}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.4s'
                }}
              />
            ))}
          </div>
          <BookOpen 
            className={clsx(
              "absolute -top-1 -right-1 text-blue-500 animate-bounce",
              size === 'sm' && "w-3 h-3",
              size === 'md' && "w-4 h-4", 
              size === 'lg' && "w-5 h-5",
              size === 'xl' && "w-6 h-6"
            )}
            style={{ animationDuration: '2s' }}
          />
        </div>
        {message && (
          <p className={clsx(
            "mt-3 text-gray-600 text-center font-medium",
            size === 'sm' && "text-xs",
            size === 'md' && "text-sm",
            size === 'lg' && "text-base",
            size === 'xl' && "text-lg"
          )}>
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={clsx("flex flex-col items-center justify-center", containerSizeClasses[size], className)}>
        <div className={clsx(
          "bg-blue-600 rounded-full animate-pulse",
          sizeClasses[size]
        )} />
        {message && (
          <p className={clsx(
            "mt-3 text-gray-600 text-center font-medium",
            size === 'sm' && "text-xs",
            size === 'md' && "text-sm",
            size === 'lg' && "text-base",
            size === 'xl' && "text-lg"
          )}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className={clsx("flex flex-col items-center justify-center", containerSizeClasses[size], className)}>
      <Loader2 className={clsx("animate-spin text-blue-600", sizeClasses[size])} />
      {message && (
        <p className={clsx(
          "mt-3 text-gray-600 text-center font-medium",
          size === 'sm' && "text-xs",
          size === 'md' && "text-sm",
          size === 'lg' && "text-base",
          size === 'xl' && "text-lg"
        )}>
          {message}
        </p>
      )}
    </div>
  );
};

// Loading skeleton for book cards
export const BookCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx("bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden", className)}>
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="h-48 bg-gray-200" />
        
        {/* Content skeleton */}
        <div className="p-4">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
          
          {/* Author */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
          
          {/* Meta info */}
          <div className="flex gap-4 mb-3">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;