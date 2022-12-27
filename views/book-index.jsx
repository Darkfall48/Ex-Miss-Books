const { useState, useEffect } = React

import { BookDetails } from './book-details.jsx'
import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { Loader } from '../cmps/loader.jsx'

import { bookService } from '../services/book.service.js'

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((booksToUpdate) => setBooks(booksToUpdate))
  }

  function onSetFilter(filterByFromFilter) {
    setFilterBy(filterByFromFilter)
  }

  function onRemoveBook(bookId) {
    bookService.remove(bookId).then(() => {
      const updatedBooks = books.filter((book) => book.id !== bookId)
      setBooks(updatedBooks)
      showSuccessMsg('Book Removed!')
    })
  }

  function onSelectBook(bookId) {
    bookService.get(bookId).then((book) => {
      setSelectedBook(book)
    })
  }

  if (!books) return <Loader />

  return (
    <section className="book-index ">
      {!selectedBook && (
        <div>
          <h1>Hello from Books Index!</h1>
          <BookFilter onSetFilter={onSetFilter} />
          <BookList
            books={books}
            onRemoveBook={onRemoveBook}
            onSelectBook={onSelectBook}
          />
        </div>
      )}

      {selectedBook && <BookDetails />}
    </section>
  )
}
