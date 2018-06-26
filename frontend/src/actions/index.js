import * as API from '../utils/api'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

export function loadCategories (categories) {
  return{
    type: LOAD_CATEGORIES,
    categories
  }
}

export function loadCategoriesFromApi () {
  return (dispatch) => {
    return API.getCategories().then(
      categories => {
        dispatch(loadCategories(categories))
      }
    )
  }
}
