const { useState, useEffect } = React

import { bookService } from './../services/book.service.js'

export function BookFilter({ onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(
    bookService.getDefaultFilter()
  )

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, [field]: value }
    })
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  return (
    <section className="book-filter">
      <h2 className="book-filter-title">Filter Our Books</h2>
      <form className="book-filter-container" onSubmit={onSubmitFilter}>
        <label htmlFor="title">Book Title: </label>
        <input
          type="text"
          id="title"
          name="txt"
          placeholder="By Title"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="author">Author: </label>
        <input
          type="txt"
          id="author"
          name="author"
          placeholder="By Author"
          value={filterByToEdit.author}
          onChange={handleChange}
        />

        <label htmlFor="categories">Categories: </label>
        <input
          type="txt"
          id="categories"
          name="categories"
          placeholder="By Categories"
          value={filterByToEdit.categories}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max Price: </label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By Max Price"
          value={filterByToEdit.maxPrice}
          onChange={handleChange}
        />

        <label htmlFor="lang">Languages: </label>
        <input
          type="txt"
          id="lang"
          name="lang"
          placeholder="By Language"
          value={filterByToEdit.lang}
          onChange={handleChange}
        />

        <label htmlFor="date">From Published Date: </label>
        <input
          type="number"
          id="date"
          name="date"
          placeholder="By Published Date"
          value={filterByToEdit.date}
          onChange={handleChange}
        />

        <label htmlFor="page">Max Page Count: </label>
        <input
          type="number"
          id="page"
          name="page"
          placeholder="By Max Page Count"
          value={filterByToEdit.page}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
