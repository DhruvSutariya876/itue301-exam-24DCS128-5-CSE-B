import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import Book from './models/Book.js'
import Member from './models/Member.js'
import Borrowing from './models/Borrowing.js'

dotenv.config({ path: new URL('../.env', import.meta.url) })

const app = express()
const port = Number(globalThis.process?.env?.PORT || 3001)

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') return response.sendStatus(204)
  next()
})
app.use(express.json())

function requestLogger(request, response, next) {
  console.log(`[${request.method}] ${request.path} [${new Date().toISOString()}]`)
  next()
}

app.use(requestLogger)

app.get('/api/v1/books', async (request, response, next) => {
  try {
    const books = await Book.find()
    response.status(200).json(books)
  } catch (error) {
    next(error)
  }
})

app.post('/api/v1/books', async (request, response, next) => {
  try {
    const book = await Book.create(request.body)
    response.status(201).json(book)
  } catch (error) {
    next(error)
  }
})

app.get('/api/v1/borrowings', async (request, response, next) => {
  try {
    const borrowings = await Borrowing.find().populate('memberId').populate('bookId')
    response.status(200).json(borrowings)
  } catch (error) {
    next(error)
  }
})

app.post('/api/v1/borrowings', async (request, response, next) => {
  try {
    const borrowing = await Borrowing.create(request.body)
    response.status(201).json(borrowing)
  } catch (error) {
    next(error)
  }
})

app.post('/api/v1/members', async (request, response, next) => {
  try {
    const member = await Member.create(request.body)
    response.status(201).json(member)
  } catch (error) {
    next(error)
  }
})

app.use((error, request, response) => {
  const isValidationError = error.name === 'ValidationError'
  const message = isValidationError
    ? Object.values(error.errors).map((item) => item.message).join(', ')
    : error.code === 11000
      ? 'A record with this unique value already exists'
      : 'Internal server error'
  const status = isValidationError || error.code === 11000 ? 400 : 500
  response.status(status).json({ success: false, message })
})

async function startServer() {
  try {
    await mongoose.connect(globalThis.process?.env?.MONGO_URI)
    app.listen(port, () => console.log(`MongoDB API running on http://localhost:${port}`))
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    globalThis.process.exitCode = 1
  }
}

startServer()

export { app }
