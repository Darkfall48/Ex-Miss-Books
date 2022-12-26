const { useEffect, useState } = React

const { useParams, useNavigate } = ReactRouterDOM

import { LongTxt } from '../cmps/long-txt.jsx'
import { bookService } from '../services/book.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const params = useParams()
  const navigate = useNavigate()
  console.log('Param:', params)

  useEffect(() => {
    loadBook()
  }, [])

  const date = new Date().getFullYear()

  function loadBook() {
    bookService
      .get(params.bookId)
      .then((book) => setBook(book))
      .catch((err) => {
        console.log('Had issue with:', err)
        onGoBack()
      })
  }

  function onGoBack() {
    navigate('/book')
  }

  function checkBookReading() {
    if (!book) console.log('No Book', book)
    console.log('Book:', book)

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

  if (!book) return <div>Loading...</div>
  return (
    <section className="book-details">
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <h3 className={`${checkBookPrice()}`}>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </h3>
      <h4>Authors: {book.authors.map((category) => category).join(', ')}</h4>
      <h4>
        Categories: {book.categories.map((category) => category).join(', ')}
      </h4>
      <h4>Pages Count: {checkBookReading()}</h4>
      <h4>Language: {book.language}</h4>
      <h4>Published At: {checkBookPublishYear()}</h4>
      {book.listPrice.isOnSale && (
        <h2 className="green">On Sale Right Now ! </h2>
      )}
      <img src={book.thumbnail} />
      <LongTxt txt={book.description} length={100} />
      <button onClick={onGoBack}>Go Back</button>
    </section>
  )
}
