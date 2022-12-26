const { useState } = React
import { AppHeader } from './cmps/app-header.jsx'
import { Home } from './views/home.jsx'
import { BookIndex } from './views/book-index.jsx'
import { About } from './views/about.jsx'

export function App() {
  const [page, setPage] = useState('book')

  function onSetPage(ev, page) {
    ev.preventDefault()
    setPage(page)
  }

  return (
    <section className="main-layout app">
      <header className="app-header full main-layout">
        <AppHeader onSetPage={onSetPage} />
      </header>

      <main>
        {page === 'home' && <Home />}
        {page === 'book' && <BookIndex />}
        {page === 'about' && <About />}
      </main>
    </section>
  )
}
