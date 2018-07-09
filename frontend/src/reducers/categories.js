import {
  LOAD_CATEGORIES,
  SELECT_CATEGORY
} from '../actions/consts'

export default function categories(state = {}, action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        category: action.category
      }
    default:
      return state
  }
}
