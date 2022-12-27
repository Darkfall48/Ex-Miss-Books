const { useEffect, useState } = React

const { useParams, useNavigate, Link } = ReactRouterDOM

import { Loader } from '../cmps/loader.jsx'
import { LongTxt } from '../cmps/long-txt.jsx'

import { bookService } from '../services/book.service.js'

export function BookDetails() {
  const [book, setBook] = useState(null)
  const { bookId } = useParams()
  const navigate = useNavigate()
  // console.log('Param:', params)

  useEffect(() => {
    loadBook()
  }, [])

  const date = new Date().getFullYear()

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => setBook(book))
      .catch((err) => {
        console.log('Had issue with:', err)
        onGoBack()
      })
  }

  function onGoBack() {
    navigate('/book')
  }

  function getPageCount() {
    const { pageCount } = book
    let pageCountStr = ''

    if (pageCount > 500) pageCountStr = pageCount + ' - Serious Reading'
    else if (pageCount <= 500 && pageCount > 200)
      pageCountStr = pageCount + ' - Descent Reading'
    else if (pageCount < 100) pageCountStr = pageCount + ' - Light Reading'
    else pageCountStr = pageCount

    return pageCountStr
  }

  function getBookPublishedYear() {
    const { publishedDate } = book
    let publishedDateStr = ''

    if (date - publishedDate > 10)
      publishedDateStr = publishedDate + ' - Vintage'
    else if (date - publishedDate <= 1)
      publishedDateStr = publishedDate + ' - New'
    else publishedDateStr = publishedDate

    return publishedDateStr
  }

  function getBookPrice() {
    if (book.listPrice.amount > 150) return 'red'
    else if (book.listPrice.amount < 20) return 'green'

    return ''
  }

  if (!book) return <Loader />

  return (
    <section className="book-details">
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <h3 className={`${getBookPrice()}`}>
        {book.listPrice.amount} {book.listPrice.currencyCode}
      </h3>

      <h4>Authors: {book.authors.map((category) => category).join(', ')}</h4>
      <h4>
        Categories: {book.categories.map((category) => category).join(', ')}
      </h4>
      <h4>Pages Count: {getPageCount()}</h4>
      <h4>Language: {book.language}</h4>
      <h4>Published At: {getBookPublishedYear()}</h4>

      {book.listPrice.isOnSale && (
        <h2 className="green">On Sale Right Now ! </h2>
      )}

      <img src={book.thumbnail} alt={`${book.title}`} />
      <LongTxt txt={book.description} length={100} />

      <button onClick={onGoBack}>Go Back</button>
      <Link to={`/book/edit/${book.id}`}>Edit me</Link>
    </section>
  )
}
