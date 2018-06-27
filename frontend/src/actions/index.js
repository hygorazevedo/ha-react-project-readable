import * as API from '../utils/api'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_CATEGORY_POSTS = 'LOAD_CATEGORY_POSTS'
export const LOAD_POSTS = 'LOAD_POSTS'

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

export function loadCategoryPosts (category, posts) {
  return{
    type: LOAD_CATEGORY_POSTS,
    category,
    posts
  }
}
export function loadCategoryPostsFromApi (category) {
  return (dispatch) => {
    return API.getCategoryPosts().then(
      posts => {
        dispatch(loadPosts(category, posts))
      }
    )
  }
}

export function loadPosts (posts) {
  return{
    type: LOAD_POSTS,
    posts
  }
}
export function loadPostsFromApi () {
  return (dispatch) => {
    return API.getPosts().then(
      posts => {
        dispatch(loadPosts(posts))
      }
    )
  }
}
