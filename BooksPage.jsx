import { useEffect, useState } from "react";
import BookCard from "./BookCard";

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/books"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const books = await response.json();

        setData(books);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <h2>Loading books...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>Books</h1>

      {data.map((book) => (
        <BookCard
          key={book.isbn}
          title={book.title}
          author={book.author}
          category={book.category}
          available={book.available}
        />
      ))}
    </div>
  );
}

export default BooksPage;