import { combineReducers } from 'redux'
import categoryReducer from './categoryReducer'
import postReducer from './postReducer'

export default combineReducers({
  categoryReducer,
  postReducer
})
