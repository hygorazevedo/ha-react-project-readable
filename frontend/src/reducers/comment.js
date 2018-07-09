import {
    LOAD_COMMENT,
    REMOVE_COMMENT
} from '../actions/consts'

const initialCommentState = {
    comments: [],
    comment: {}
}

export default function comment(state = initialCommentState, action) {
    switch (action.type) {
        case LOAD_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.comment),
                comment: action.comment
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment.id !== action.id)
            }
        default:
            return state
    }
}