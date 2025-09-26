import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="text-center space-y-6">
        {/* Animated book icons */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="text-4xl animate-bounce">📚</div>
          <div className="text-4xl animate-bounce delay-150">📖</div>
          <div className="text-4xl animate-bounce delay-300">📝</div>
        </div>
        
        {/* Multi-layered spinner */}
        <div className="relative">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="absolute inset-2 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          <div className="absolute inset-4 animate-spin rounded-full border-4 border-pink-400 border-t-transparent" style={{animationDuration: '2s'}}></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl animate-pulse">🔍</span>
          </div>
        </div>
        
        {/* Loading text with gradient */}
        <div className="space-y-2">
          <p className="text-xl font-semibold gradient-text">Searching for books...</p>
          <div className="flex justify-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-sm text-gray-500 animate-pulse">Please wait while we explore the library</p>
        </div>
        
        {/* Progress-like animation */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner