import {
  LOAD_POSTS
} from '../actions'

const initialState = {
  posts:[
    {
      id: "",
      timestamp: 0,
      title: "",
      body: "",
      author: "",
      category: "",
      voteScore: 0,
      deleted: false,
      commentCount: 0
    }
  ]
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}
