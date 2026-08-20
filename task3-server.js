import express from 'express'

const app = express()
const port = 3000

const books = [
  { title: 'The Midnight Library', author: 'Matt Haig', category: 'Fiction', isbn: '9780525559474', available: true },
  { title: 'Atomic Habits', author: 'James Clear', category: 'Self Development', isbn: '9780735211292', available: true },
  { title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Design', isbn: '9780465050659', available: false },
]

const borrowings = [
  { memberId: 'M-104', bookId: '9780465050659', borrowDate: '2026-08-12', returnDate: '', status: 'borrowed' },
]

function requestLogger(request, response, next) {
  console.log(`[${request.method}] ${request.path} [${new Date().toISOString()}]`)
  next()
}

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') return response.sendStatus(204)
  next()
})
app.use(requestLogger)
app.use(express.json())

app.get('/api/v1/borrowings', (request, response) => response.status(200).json(borrowings))

app.post('/api/v1/borrowings', (request, response) => {
  const borrowing = request.body
  borrowings.push(borrowing)
  response.status(201).json(borrowing)
})

app.get('/api/v1/books', (request, response) => response.status(200).json(books))

app.use((error, request, response) => {
  console.error(error.message)
  response.status(500).json({ success: false, message: 'Internal server error' })
})

app.listen(port, () => console.log(`Task 3 API running on http://localhost:${port}`))
