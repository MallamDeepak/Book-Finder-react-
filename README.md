# 📚 Book Finder

A modern, responsive web application built for Alex, a college student who wants to search books in multiple ways using the Open Library API.

## 🌟 Features

- **Multi-way search**: Search books by title, author, ISBN, subject, or publisher
- **Responsive design**: Works seamlessly on desktop and mobile devices
- **Book covers**: Display book cover images from Open Library
- **Pagination**: Navigate through large result sets efficiently
- **Loading states**: Clear feedback while searching
- **Error handling**: Graceful error messages for better user experience
- **Quick searches**: Pre-defined search suggestions for instant exploration
- **Direct links**: Links to detailed book information on Open Library

## 🚀 Technology Stack

- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Open Library API** - Comprehensive book database
- **ES6+** - Modern JavaScript features

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

1. **Search Books**: Enter your search term in the search box
2. **Choose Search Type**: Select from title, author, ISBN, subject, publisher, or general search
3. **Browse Results**: View books in a clean card layout with covers and details
4. **Navigate Pages**: Use pagination to explore more results
5. **View Details**: Click "View Details" to see full information on Open Library
6. **Quick Searches**: Use the suggested searches for instant results

## 🎨 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # App header with branding
│   ├── SearchForm.jsx      # Search form with multiple options
│   ├── BookResults.jsx     # Results container with pagination
│   ├── BookCard.jsx        # Individual book display card
│   ├── LoadingSpinner.jsx  # Loading state component
│   └── Pagination.jsx      # Pagination controls
├── App.jsx                 # Main application component
├── App.css                 # Custom styles
├── index.css               # Tailwind CSS imports
└── main.jsx               # Application entry point
```

## 🌐 API Integration

This application uses the [Open Library Search API](https://openlibrary.org/developers/api) to fetch book information. The API provides:

- Book metadata (title, author, publication info)
- Cover images
- Subject classifications
- ISBN information
- Publisher details

Example API call:
```
https://openlibrary.org/search.json?title=harry+potter&limit=20&page=1
```

## 🎯 Take-Home Challenge Requirements

This project fulfills the requirements for the Book Finder user story:

### User Persona
- **Name**: Alex
- **Occupation**: College Student
- **Need**: Multiple ways to search for books

### Implementation
- ✅ **Working with AI**: All code developed with AI assistance
- ✅ **Working application**: Fully functional book search with multiple search types
- ✅ **Code sharing**: Complete codebase with documentation
- ✅ **Public API**: Uses Open Library API (no authentication required)
- ✅ **React framework**: Built with React and modern tooling
- ✅ **Styling**: Tailwind CSS for responsive design
- ✅ **State management**: React's built-in state management

## 🚀 Deployment

This application is ready for deployment on:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Deploy the built application
- **CodeSandbox**: Import the repository directly

### Deployment Commands

For most platforms, use:
```bash
npm run build
```

Then upload the `dist` directory to your hosting platform.

## 🔧 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is a take-home challenge project, but suggestions and improvements are welcome!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for Alex's book discovery journey!
