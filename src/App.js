import { render } from "react-dom"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { useState, lazy, Suspense } from "react"
import ThemeContext from "./ThemeContext"
// static import => execute in buildtime but not runtime
// so we couldn't do something like below:
/* 
=> This won't work!!!
const x = "./ThemeContext"
import ThemeContext = x

=> In commonJS, this would work because it call at run time
const x = "./ThemeContext"
const ThemeContext = require(x)
*/
// import SearchParams from './SearchParams'
// import Details from './Details'

// dynamin import
const SearchParams = lazy(() => import('./SearchParams'))
const Details = lazy(() => import('./Details'))

const App = () => {
  const theme = useState('darkblue')
  return (
    <ThemeContext.Provider value={theme}>
      <Suspense fallback={<h1>Loading......</h1>}>
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
      </Suspense>
      </ThemeContext.Provider>
  )
}

render(<App />, document.getElementById('root'))