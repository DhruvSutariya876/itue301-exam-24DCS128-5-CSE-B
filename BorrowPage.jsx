import { useState } from 'react'

function BorrowPage({ books, members, borrowings, onBorrow }) {
  const availableBooks = books.filter((book) => book.available)
  const [formData, setFormData] = useState({ memberId: '', bookId: '', borrowDate: '', returnDate: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onBorrow({
      ...formData,
      status: 'borrowed',
    })
    setFormData({ memberId: '', bookId: '', borrowDate: '', returnDate: '' })
  }

  return (
    <section className="page-section borrow-page" aria-labelledby="borrow-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Circulation desk</p>
          <h1 id="borrow-title">Record a borrowing</h1>
        </div>
        <p className="page-heading__summary">A simple record keeps every handoff accountable.</p>
      </div>

      <div className="borrow-layout">
        <form className="borrow-form" onSubmit={handleSubmit}>
          <label htmlFor="memberId">Member</label>
          <select id="memberId" name="memberId" value={formData.memberId} onChange={handleChange} required>
            <option value="" disabled>Select a member</option>
            {members.map((member) => <option key={member.id} value={member.id}>{member.name} - {member.department}</option>)}
          </select>

          <label htmlFor="bookId">Book</label>
          <select id="bookId" name="bookId" value={formData.bookId} onChange={handleChange} required>
            <option value="" disabled>Select an available book</option>
            {availableBooks.map((book) => <option key={book.isbn} value={book.isbn}>{book.title}</option>)}
          </select>

          <label htmlFor="borrowDate">Borrow date</label>
          <input id="borrowDate" name="borrowDate" type="date" value={formData.borrowDate} onChange={handleChange} required />
          <label htmlFor="returnDate">Return date</label>
          <input id="returnDate" name="returnDate" type="date" value={formData.returnDate} onChange={handleChange} />
          <button className="button button--primary" type="submit">Save borrowing <span aria-hidden="true">&rarr;</span></button>
        </form>

        <p className="form-preview" aria-live="polite">
          {formData.bookId ? `Selected book: ${books.find((book) => book.isbn === formData.bookId)?.title}` : 'Select a book to preview the borrowing record.'}
        </p>

        <div className="loan-list">
          <div className="loan-list__header">
            <span className="eyebrow">Recent activity</span>
            <span>{borrowings.length} records</span>
          </div>
          {borrowings.map((borrowing) => {
            const member = members.find((item) => item.id === borrowing.memberId)
            const book = books.find((item) => item.isbn === borrowing.bookId)
            return (
              <div className="loan-row" key={`${borrowing.memberId}-${borrowing.bookId}`}>
                <div><strong>{book?.title}</strong><span>{member?.name}</span></div>
                <span className={`loan-status loan-status--${borrowing.status}`}>{borrowing.status}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BorrowPage
