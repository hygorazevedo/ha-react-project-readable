import * as API from '../utils/api'
import * as actionCreators from './actionCreators'

export function loadCategoriesFromAPI() {
  return (dispatch) => {
    API.getCategories().then(
      (response) => dispatch(actionCreators.loadCategories(response))
    )
  }
}
export function loadCategoryPostsFromAPI(category) {
  return (dispatch) => {
    API.getCategoryPosts(category).then(
      (response) => dispatch(
        actionCreators.loadCategoryPosts(category, response)
      )
    )
  }
}


export function loadPostFromAPI(id) {
  return (dispatch) => {
    API.getPost(id).then(
      (response) => dispatch(actionCreators.loadPosts(response))
    )
  }
}
export function savePostInAPI(post) {
  return (dispatch) => {
    API.createPost(post).then(
      (response) => dispatch(actionCreators.loadPost(response))
    )
  }
}
export function EditPostInAPI(post) {
  return (dispatch) => {
    API.editPost(post).then(
      (response) => dispatch(actionCreators.loadPost(response))
    )
  }
}
export function DeletePostInAPI(id) {
  return (dispatch) => {
    API.deletePost(id).then(
      () => dispatch(actionCreators.removePost(id))
    )
  }
}


export function loadComentariesFromAPI(id) {
  return (dispatch) => {
    API.getComments(id).then(
      (response) => dispatch(actionCreators.loadComments(id, response))
    )
  }
}
export function loadComentaryFromAPI(id) {
  return (dispatch) => {
    API.getComment(id).then(
      (response) => dispatch(actionCreators.loadComment(id, response))
    )
  }
}
export function saveCommentInAPI(id) {
  return (dispatch) => {
    API.createComment(id).then(
      (response) => dispatch(actionCreators.loadComment(id, response))
    )
  }
}
export function editCommentInAPI(comment) {
  return (dispatch) => {
    API.editComment(comment).then(
      (response) => dispatch(actionCreators.loadComment(comment.id, response))
    )
  }
}
export function removeCommentFromAPI(id) {
  return (dispatch) => {
    API.deleteComment(id).then(
      () => dispatch(actionCreators.removeComment(id))
    )
  }
}
export function saveVoteInAPI(id, data, path, fromPost) {
  let voto = (data.option === 'upVote') ? 1 : -1

  return (dispatch) => {
    API.votePost(id, data, path).then(
      () => dispatch(actionCreators.vote(id, voto, path, fromPost))
    )
  }
}