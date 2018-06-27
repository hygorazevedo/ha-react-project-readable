import {
  LOAD_CATEGORIES
} from '../actions'

const initialState = {
  categories:[
    {
      name: '',
      path: ''
    }
  ]
}

export default function categories (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}
