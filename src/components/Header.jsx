import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-2xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-8 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-6 left-1/4 w-12 h-12 bg-pink-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-4 right-1/3 w-8 h-8 bg-green-300 rounded-full animate-bounce delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text flex items-center gap-3">
              <span className="text-5xl animate-bounce">📚</span>
              <span>Book Finder</span>
            </h1>
            <p className="text-blue-100 mt-2 text-lg animate-fade-in">
              Discover your next great read with Alex ✨
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
              </div>
              <span className="text-xs text-blue-200">Live & Interactive</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-right space-y-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-sm text-blue-100 flex items-center justify-end gap-2">
                <span className="text-lg">🌐</span>
                Powered by Open Library
              </p>
              <p className="text-xs text-blue-200 flex items-center justify-end gap-2">
                <span className="text-sm">📊</span>
                Search millions of books
              </p>
              <div className="flex justify-end gap-1 mt-2">
                <div className="w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
                <div className="w-1 h-1 bg-purple-300 rounded-full animate-ping delay-100"></div>
                <div className="w-1 h-1 bg-pink-300 rounded-full animate-ping delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>
    </header>
  )
}

export default Header