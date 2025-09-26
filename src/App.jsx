import { useState } from 'react'
import SearchForm from './components/SearchForm'
import BookResults from './components/BookResults'
import Header from './components/Header'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [totalBooks, setTotalBooks] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      <Header />
      <main className="container mx-auto px-4 py-12 relative z-10">
        <SearchForm 
          onResults={setBooks}
          onLoading={setLoading}
          onError={setError}
          onTotalBooks={setTotalBooks}
          onCurrentPage={setCurrentPage}
        />
        <BookResults 
          books={books}
          loading={loading}
          error={error}
          totalBooks={totalBooks}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  )
}

export default App
