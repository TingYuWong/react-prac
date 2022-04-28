import { combineReducers } from 'redux'
import location from './location'
import animal from './animal'
import breed from './breed'
import theme from './theme'

export default combineReducers({
  location,
  animal,
  breed,
  theme,
})

