import { createStore } from 'redux'
import reducer from './reducers'

// window == 'object' 表示 不是在node環境
// EXTENSION 是其中一個可以用的middleware
// 這邊是指有就執行extension 沒有就什麼都不做
const store = createStore(reducer, 
  typeof window === "object" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f
)

export default store

