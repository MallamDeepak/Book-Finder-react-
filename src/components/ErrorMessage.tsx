import React from 'react';
import { CircleAlert as AlertCircle, RefreshCw, Wifi, Server, Search } from 'lucide-react';
import { clsx } from 'clsx';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  variant?: 'default' | 'network' | 'server' | 'search' | 'notFound';
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  variant = 'default',
  className
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'network':
        return <Wifi className="w-12 h-12 text-red-400" />;
      case 'server':
        return <Server className="w-12 h-12 text-red-400" />;
      case 'search':
        return <Search className="w-12 h-12 text-red-400" />;
      case 'notFound':
        return <AlertCircle className="w-12 h-12 text-yellow-400" />;
      default:
        return <AlertCircle className="w-12 h-12 text-red-400" />;
    }
  };

  const getTitle = () => {
    switch (variant) {
      case 'network':
        return 'Connection Error';
      case 'server':
        return 'Server Error';
      case 'search':
        return 'Search Error';
      case 'notFound':
        return 'Not Found';
      default:
        return 'Something went wrong';
    }
  };

  const getBgColor = () => {
    switch (variant) {
      case 'notFound':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'notFound':
        return 'text-yellow-800';
      default:
        return 'text-red-800';
    }
  };

  return (
    <div className={clsx("w-full max-w-md mx-auto", className)}>
      <div className={clsx(
        "rounded-xl border-2 p-8 text-center",
        getBgColor()
      )}>
        <div className="flex justify-center mb-4">
          {getIcon()}
        </div>
        
        <h3 className={clsx("text-lg font-semibold mb-2", getTextColor())}>
          {getTitle()}
        </h3>
        
        <p className={clsx("text-sm mb-6 leading-relaxed", getTextColor())}>
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className={clsx(
              "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              variant === 'notFound' 
                ? "bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500"
                : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
            )}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

// Inline error component for smaller spaces
export const InlineError: React.FC<{
  message: string;
  onRetry?: () => void;
  className?: string;
}> = ({ message, onRetry, className }) => {
  return (
    <div className={clsx("flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg", className)}>
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
        <span className="text-sm text-red-800">{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-3 text-sm text-red-600 hover:text-red-800 font-medium focus:outline-none focus:underline"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;