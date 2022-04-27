import { createContext } from "react"

// mimic useState hook
const ThemeContext = 
createContext<[string, (item: string) => void]>(['green', () => {}])
// const ThemeContext = createContext()

export default ThemeContext

