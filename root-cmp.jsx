const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/app-header.jsx'
import { Home } from './views/home.jsx'
import { BookIndex } from './views/book-index.jsx'
import { BookDetails } from './views/book-details.jsx'
import { About } from './views/about.jsx'

export function App() {
  return (
    <Router>
      <section className="main-layout app">
        <header className="app-header full main-layout">
          <AppHeader />
        </header>

        <main>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<BookIndex />} path="/book" />
            <Route element={<BookDetails />} path="/book/:bookId" />
            <Route element={<About />} path="/about" />
          </Routes>
        </main>
      </section>
    </Router>
  )
}
