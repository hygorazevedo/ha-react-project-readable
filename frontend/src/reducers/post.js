import {
    LOAD_POST,
    REMOVE_POST,
    VOTE_POST,
    VOTE_POST_FROM_POST
} from '../actions/consts'

const initialPostState = {
    posts: [],
    post: {}
}

export default function post(state = initialPostState, action) {
    switch (action.type) {
        case LOAD_POST:
            return {
                ...state,
                post: action.post
            }
        case REMOVE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.id)
            }
        case VOTE_POST_FROM_POST:
            return {
                ...state,
                post: {
                    ...state.post,
                    voteScore: state.post.voteScore + action.vote
                }
            }
        default:
            return state
    }
}