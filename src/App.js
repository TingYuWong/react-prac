import { render } from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SearchParams from './SearchParams'
import Details from './Details'

const App = () => {
  return (
    <BrowserRouter>
    <div>
      <h1>Adopt Me!</h1>
      <Routes>
        <Route path="/details/:id" element={<Details />}/>
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </div>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById('root'))