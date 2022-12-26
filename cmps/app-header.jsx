export function AppHeader({ onSetPage }) {
  return (
    <React.Fragment>
      <h1>Miss Books</h1>
      <nav className="app-nav">
        <a href="#" onClick={(ev) => onSetPage(ev, 'home')}>
          Home
        </a>{' '}
        |
        <a href="#" onClick={(ev) => onSetPage(ev, 'book')}>
          Books
        </a>{' '}
        |
        <a href="#" onClick={(ev) => onSetPage(ev, 'about')}>
          About
        </a>
      </nav>
    </React.Fragment>
  )
}
