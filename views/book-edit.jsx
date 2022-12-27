import { bookService } from '../services/book.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (!bookId) return
    loadBook()
  }, [])

  function loadBook() {
    bookService
      .get(bookId)
      .then((book) => {
        console.log('Book to edit:', book)
        setBookToEdit(book)
      })
      .catch((err) => {
        console.log(err)
        navigate(-1)
      })
  }

  function handleChange({ target }) {
    let { value, type, name: field } = target
    value = type === 'number' ? +value : value
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
  }

  function handlePriceChange({ target }) {
    let { value } = target
    value = +value
    setBookToEdit((prevBook) => ({
      ...prevBook,
      listPrice: {
        amount: value,
        currencyCode: prevBook.listPrice.currencyCode,
        isOnSale: prevBook.listPrice.isOnSale,
      },
    }))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit).then((book) => {
      console.log('book', book)
      showSuccessMsg('Book saved')
      navigate('/book')
    })
  }

  return (
    <section className="book-edit">
      <h2> {bookToEdit.id ? 'Edit this book' : 'Add a new book'}</h2>
      <form onSubmit={onSaveBook}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Enter title..."
          value={bookToEdit.title}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Enter price..."
          value={bookToEdit.listPrice.amount}
          onChange={handlePriceChange}
        />

        <div>
          <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
          <Link to="/book">Cancel</Link>
        </div>
      </form>
    </section>
  )
}
