Created 2 Branch Frontend And Backend


# ITUE301 Library Book Management System

**Roll Number:** 24DCS128  
**Batch:** 5-CSE-B

A beginner-friendly library management system built for the ITUE301 exam. The project has a React frontend, an Express REST API, and a separate MongoDB/Mongoose backend.

## Technologies

- React
- React Router
- Express.js
- MongoDB and Mongoose
- dotenv

## Required Structure

```text
itue301-exam-24DCS128-5-CSE-B/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   │   ├── Book.js
│   │   ├── Member.js
│   │   └── Borrowing.js
│   ├── server.js
│   ├── task3-server.js
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation

Install the frontend dependencies:

```powershell
cd frontend
npm install
```

Install the backend dependencies in a second terminal:

```powershell
cd backend
npm install
```

## Run the Frontend

From the `frontend` folder:

```powershell
npm run dev
```

The frontend normally runs at `http://localhost:5173`.

Available frontend routes:

```text
/        HomePage
/books  BooksPage
/borrow  BorrowPage
```

`BooksPage` calls `GET http://localhost:3000/api/v1/books` and displays the returned books.

## Run the Task 3 API

The in-memory Express API runs on port 3000. Start it in a separate terminal:

```powershell
cd backend
npm run task3
```

Or:

```powershell
cd backend
node task3-server.js
```

Keep this terminal running while using the frontend.

### Task 3 Endpoints

```text
GET  http://localhost:3000/api/v1/books
GET  http://localhost:3000/api/v1/borrowings
POST http://localhost:3000/api/v1/borrowings
```

Example POST body:

```json
{
  "memberId": "M-123",
  "bookId": "9780525559474",
  "borrowDate": "2026-08-20",
  "returnDate": "",
  "status": "borrowed"
}
```

The global `requestLogger` prints requests like:

```text
[GET] /api/v1/books [2026-08-20T10:15:20.000Z]
```

## Run the MongoDB Backend

Install MongoDB locally or use MongoDB Atlas. Copy the root environment template:

From the project root on Windows:

```powershell
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Edit `.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/libraryDB
PORT=3001
```

Do not commit `.env`. It is ignored by `.gitignore`. Commit `.env.example` instead.

Make sure MongoDB is running, then start the Mongoose server from the backend folder:

```powershell
cd backend
node server.js
```

The MongoDB API runs on port 3001. Running `node server.js` from the project root will not work because the file is inside `backend`.

### MongoDB Endpoints

```text
GET  http://localhost:3001/api/v1/books
POST http://localhost:3001/api/v1/books
GET  http://localhost:3001/api/v1/borrowings
POST http://localhost:3001/api/v1/borrowings
POST http://localhost:3001/api/v1/members
```

Example book creation:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "category": "Technology",
  "isbn": "9780132350884"
}
```

Example validation error for a missing title:

```json
{
  "success": false,
  "message": "Path `title` is required."
}
```

## Testing

Frontend checks:

```powershell
cd frontend
npm run lint
npm run build
```

Test the REST APIs with Postman or Thunder Client. View MongoDB documents with MongoDB Compass or MongoDB Atlas.

## Viva Notes

- **Components:** `HomePage`, `BooksPage`, `BorrowPage`, `Navigation`, and reusable `BookCard`.
- **Props:** `BookCard` receives title, author, category, and availability from its parent.
- **useState:** Stores form values and library state.
- **useEffect:** Requests books when `BooksPage` mounts.
- **React Router:** Provides `/`, `/books`, and `/borrow` without full-page reloads.
- **Controlled inputs:** Form fields use `value` and `onChange`.
- **fetch:** Sends the asynchronous request from React to Express.
- **Middleware:** Runs before route handlers; `requestLogger` records every request.
- **Error middleware:** Returns structured JSON without exposing raw error stacks.
- **Mongoose schemas:** Define database fields and validation rules.
- **ObjectId references:** Borrowings reference `Member` and `Book` documents.
- **.env:** Stores the MongoDB connection string outside JavaScript source code.

## Exam Details

- Repository name: `itue301-exam-24DCS128-5-CSE-B`
- Roll number: `24DCS128`
- Batch: `5-CSE-B`
- Report filename: `24DCS128_SetB_Report.pdf`
#
