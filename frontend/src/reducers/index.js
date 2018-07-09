import { combineReducers } from 'redux'
import categories from './categories'
import comments from './comments'
import comment from './comment'
import order from './order'
import posts from './posts'
import post from './post'

export default combineReducers({
  categories: categories,
  comments: comments,
  comment: comment,
  order: order,
  posts: posts,
  post: post
})
