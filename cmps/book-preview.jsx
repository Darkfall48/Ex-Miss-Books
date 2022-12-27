const { Link } = ReactRouterDOM

import { utilService } from '../services/util.service.js'

export function BookPreview({ book, onRemoveBook }) {
  return (
    <article className="book-preview">
      <div className="book-preview-img-container">
        {book.listPrice.isOnSale && (
          <div className="book-preview-sale-tag">On Sale!</div>
        )}
        <img src={book.thumbnail} />
        <div className="book-preview-buttons">
          <button
            className="book-preview-remove-button"
            onClick={() => onRemoveBook(book.id)}
          >
            R
          </button>
          <Link className="book-preview-info-button" to={`/book/${book.id}`}>
            Info
          </Link>
        </div>
      </div>
      <h2 className="book-preview-title">{book.title}</h2>
      <h3>
        Price:{' '}
        {utilService.getAmount(
          book.listPrice.amount,
          book.listPrice.currencyCode
        )}
      </h3>
    </article>
  )
}
