const { NavLink, Link } = ReactRouterDOM

export function AppHeader() {
  return (
    <React.Fragment>
      <Link to="/book">
        <h1>Miss Books</h1>
      </Link>
      <nav className="app-nav">
        <NavLink to="/">Home</NavLink> |<NavLink to="/book">Book</NavLink> |
        <NavLink to="/about">About</NavLink>
      </nav>
    </React.Fragment>
  )
}
