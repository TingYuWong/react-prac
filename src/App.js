// start for intermediate react class

import { render } from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState } from "react"
import ThemeContext from "./ThemeContext"
import SearchParams from './SearchParams'
import Details from './Details'

const App = () => {
  const theme = useState('darkblue')
  return (
    <ThemeContext.Provider value={theme}>
      <BrowserRouter>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />}/>
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </div>
      </BrowserRouter>
      </ThemeContext.Provider>
  )
}

render(<App />, document.getElementById('root'))