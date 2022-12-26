const { useState, useEffect } = React

import { BookFilter } from '../cmps/book-filter.jsx'
import { BookList } from '../cmps/book-list.jsx'
import { BookDetails } from '../cmps/book-details.jsx'
import { UserMsg } from '../cmps/user-msg.jsx'
import { Loader } from '../cmps/loader.jsx'

import { bookService } from '../services/book.service.js'

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBook, setSelectedBook] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [userMsg, setUserMsg] = useState('')

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
      flashMsg('Book removed!')
    })
  }

  function onSelectBook(bookId) {
    bookService.get(bookId).then((book) => {
      setSelectedBook(book)
    })
  }

  function flashMsg(msg) {
    setUserMsg(msg)
    setTimeout(() => {
      setUserMsg('')
    }, 3000)
  }

  if (!books) return <Loader />

  return (
    <section className="book-index ">
      {userMsg && <UserMsg msg={userMsg} />}
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

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onGoBack={() => setSelectedBook(null)}
        />
      )}
    </section>
  )
}
