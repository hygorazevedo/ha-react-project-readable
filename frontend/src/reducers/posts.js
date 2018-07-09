import {
  LOAD_POSTS,
  LOAD_CATEGORY_POSTS,
  REMOVE_POST,
  VOTE_POST
} from '../actions/consts'

const initialPostsState = {
  posts: []
}

export default function posts (state = initialPostsState, action) {
  switch(action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    case LOAD_CATEGORY_POSTS:
      return {
        ...state,
        category: action.category,
        posts: action.posts
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id)
      }
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post.id === action.id) {
            post.voteScore = post.voteScore + action.vote
          }
          return post;
        })
      }
    default:
      return state
  }
}