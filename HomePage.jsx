import { Link } from 'react-router-dom'

function HomePage({ books, members, borrowings }) {
  const availableBooks = books.filter((book) => book.available).length
  const activeLoans = borrowings.filter((borrowing) => borrowing.status === 'borrowed').length

  return (
    <section className="page-section home-page" aria-labelledby="home-title">
      <div className="home-page__intro">
        <p className="eyebrow">Campus library / 2026</p>
        <h1 id="home-title">A quieter way to manage your collection.</h1>
        <p className="lede">Keep the books moving and the people reading. Browse the collection, record a loan, and stay close to what is happening across the library.</p>
        <div className="home-page__actions">
          <Link className="button button--primary" to="/books">Browse books <span aria-hidden="true">&rarr;</span></Link>
          <Link className="button button--secondary" to="/borrow">Record a borrowing</Link>
        </div>
      </div>

      <div className="stats-grid" aria-label="Library overview">
        <div className="stat-card">
          <span className="stat-card__label">Available books</span>
          <strong>{availableBooks}</strong>
          <span className="stat-card__detail">of {books.length} in collection</span>
        </div>
        <div className="stat-card stat-card--warm">
          <span className="stat-card__label">Registered members</span>
          <strong>{members.length}</strong>
          <span className="stat-card__detail">active readers</span>
        </div>
        <div className="stat-card stat-card--dark">
          <span className="stat-card__label">Active borrowings</span>
          <strong>{activeLoans}</strong>
          <span className="stat-card__detail">currently on loan</span>
        </div>
      </div>
    </section>
  )
}

export default HomePage
