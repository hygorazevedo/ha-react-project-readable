import {
  LOAD_COMMENTS,
  VOTE_COMMENT
} from '../actions/consts'

const initialCommentsState = {
  comments: []
}

export default function comments(state = initialCommentsState, action) {
  switch (action.type) {
    case LOAD_COMMENTS:
      return {
        ...state,
        comments: action.comments
      }
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === action.id) {
            comment.voteScore = comment.voteScore + action.vote
          }
          return comment;
        })
      }
    default:
      return state
  }
}