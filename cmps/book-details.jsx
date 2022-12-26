import { LongTxt } from '../cmps/long-txt.jsx'

export function BookDetails({ book, onGoBack }) {
  const date = new Date().getFullYear()
  const bookPageCount = checkBookReading()
  const bookPublishedAt = checkBookPublishYear()
  const bookDynClass = checkBookPrice()

  function checkBookReading() {
    let strPagesCount = ''
    if (book.pageCount > 500)
      strPagesCount = book.pageCount + ' Serious Reading'
    else if (book.pageCount <= 500 && book.pageCount > 200)
      strPagesCount = book.pageCount + ' Descent Reading'
    else if (book.pageCount < 100)
      strPagesCount = book.pageCount + ' Light Reading'
    else strPagesCount = book.pageCount
    return strPagesCount
  }

  function checkBookPublishYear() {
    let strPublishedAt = ''
    if (date - book.publishedDate > 10)
      strPublishedAt = book.publishedDate + ' Vintage'
    else if (date - book.publishedDate <= 1)
      strPublishedAt = book.publishedDate + ' New'
    else strPublishedAt = book.publishedDate
    return strPublishedAt
  }

  function checkBookPrice() {
    let dynClass = ''
    if (book.listPrice.amount > 150) dynClass = 'red'
    else if (book.listPrice.amount < 20) dynClass = 'green'
    return dynClass
  }

  return (
    <section className="book-details">
      <h2>Title : {book.title}</h2>
      <h3>Subtitle : {book.subtitle}</h3>
      <h3>
        Price:{' '}
        <span className={bookDynClass}>
          {book.listPrice.amount} {book.listPrice.currencyCode}
        </span>
      </h3>
      <h4>Published At: {bookPublishedAt}</h4>
      <h4>Pages Count: {bookPageCount}</h4>
      {book.listPrice.isOnSale && (
        <h2 className="green">On Sale Right Now ! </h2>
      )}
      <img src={book.thumbnail} />
      <LongTxt txt={book.description} length={100} />
      <button onClick={onGoBack}>Go Back</button>
    </section>
  )
}
