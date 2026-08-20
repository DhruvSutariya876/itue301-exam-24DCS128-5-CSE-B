import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BooksPage from './components/BooksPage'
import BorrowPage from './components/BorrowPage'
import HomePage from './components/HomePage'
import Navigation from './components/Navigation'
import './App.css'

const initialBooks = [
  { title: 'The Midnight Library', author: 'Matt Haig', category: 'Fiction', isbn: '9780525559474', available: true },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self development', isbn: '9780735211292', available: true },
  { title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Design', isbn: '9780465050659', available: false },
  { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '9780553380163', available: true },
  { title: 'Educated', author: 'Tara Westover', category: 'Memoir', isbn: '9780399590504', available: false },
  { title: 'The Pragmatic Programmer', author: 'David Thomas', category: 'Technology', isbn: '9780135957059', available: true },
]

const members = [
  { id: 'M-104', name: 'Aisha Rahman', email: 'aisha@college.edu', phone: '555-0142', department: 'Computer Science' },
  { id: 'M-117', name: 'Daniel Okafor', email: 'daniel@college.edu', phone: '555-0188', department: 'Architecture' },
  { id: 'M-123', name: 'Mei Tanaka', email: 'mei@college.edu', phone: '555-0127', department: 'Life Sciences' },
]

const initialBorrowings = [
  { memberId: 'M-104', bookId: '9780465050659', borrowDate: '2026-08-12', returnDate: '', status: 'borrowed' },
  { memberId: 'M-117', bookId: '9780399590504', borrowDate: '2026-08-02', returnDate: '', status: 'overdue' },
  { memberId: 'M-123', bookId: '9780735211292', borrowDate: '2026-08-15', returnDate: '2026-08-19', status: 'returned' },
]

function App() {
  const [books, setBooks] = useState(initialBooks)
  const [borrowings, setBorrowings] = useState(initialBorrowings)

  function addBorrowing(borrowing) {
    setBorrowings((currentBorrowings) => [borrowing, ...currentBorrowings])
    setBooks((currentBooks) => currentBooks.map((book) => book.isbn === borrowing.bookId ? { ...book, available: false } : book))
  }

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navigation bookCount={books.length} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage books={books} members={members} borrowings={borrowings} />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/borrow" element={<BorrowPage books={books} members={members} borrowings={borrowings} onBorrow={addBorrowing} />} />
          </Routes>
        </main>
        <footer><span>College library</span><span>Open every day, 8:00 - 20:00</span></footer>
      </div>
    </BrowserRouter>
  )
}

export default App
