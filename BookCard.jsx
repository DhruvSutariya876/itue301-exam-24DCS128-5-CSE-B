function BookCard({ title, author, category, available }) {
  return (
    <article className="book-card">
      <div className="book-card__topline">
        <span className="book-card__category">{category}</span>
        <span className={`availability ${available ? 'availability--available' : 'availability--unavailable'}`}>
          <span className="availability__dot" aria-hidden="true" />
          {available ? 'Available' : 'Not Available'}
        </span>
      </div>
      <h3>{title}</h3>
      <p className="book-card__author">by {author}</p>
      <div className="book-card__footer">
        <span>Library collection</span>
        <span aria-hidden="true">&rarr;</span>
      </div>
    </article>
  )
}

export default BookCard
