import {
  LOAD_CATEGORIES
} from '../actions'

const initialState = [
  {
    name:'',
    path:''
  }
]

function categories (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      }
    default:
      return state
  }
}

export default categories
