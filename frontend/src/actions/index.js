import * as API from '../utils/api'
import * as actionCreators from './actionCreators'

export function callCarregarCategorias() {
  return (dispatch) => {
    API.getCategories().then(
      (response) => dispatch(actionCreators.carregarCategorias(response))
    )
  }
}

export function callCarregarPostagens() {
  return (dispatch) => {
    API.getPosts().then(
      (response) => dispatch(actionCreators.carregarPostagens(response))
    )
  }
}

export function callCarregarPostagensPorCategoria(categoria) {
  return (dispatch) => {
    API.getPostsByCategory(categoria).then(
      (response) => dispatch(actionCreators.carregarPostagensPorCategoria(categoria, response))
    )
  }
}

export function callCarregarPostagem(id) {
  return (dispatch) => {
    API.getPost(id).then(
      (response) => dispatch(actionCreators.carregarPostagem(response))
    )
  }
}

export function callCriarPostagem(postagem) {
  return (dispatch) => {
    API.createPost(postagem).then(
      (response) => {
        console.log(response)
        return (
          dispatch(actionCreators.carregarPostagem(response))
        )
      }
    )
  }
}

export function callEditarPostagem(postagem) {
  return (dispatch) => {
    API.editPost(postagem).then(
      (response) => dispatch(actionCreators.carregarPostagem(response))
    )
  }
}

export function callExcluirPostagem(id) {
  return (dispatch) => {
    API.deletePost(id).then(
      () => dispatch(actionCreators.excluirPostagem(id))
    )
  }
}

export function callCarregarComentarios(id) {
  return (dispatch) => {
    API.getComments(id).then(
      (response) => dispatch(actionCreators.carregarComentarios(id, response))
    )
  }
}

export function callCarregarComentario(id) {
  return (dispatch) => {
    API.getComment(id).then(
      (response) => dispatch(actionCreators.carregarComentario(id, response))
    )
  }
}

export function callCriarComentario(id) {
  return (dispatch) => {
    API.createComment(id).then(
      (response) => dispatch(actionCreators.carregarComentario(id, response))
    )
  }
}

export function callEditarComentario(comentario) {
  return (dispatch) => {
    API.editComment(comentario).then(
      (response) => dispatch(actionCreators.carregarComentario(comentario.id, response))
    )
  }
}

export function callExcluirComentario(id) {
  return (dispatch) => {
    API.deleteComment(id).then(
      () => dispatch(actionCreators.excluirComentario(id))
    )
  }
}

export function callVotar(id, data, path, fromPost) {
  let voto = (data.option === 'upVote') ? 1 : -1
  console.log(`${id} ${data.option} ${path} ${fromPost} ${voto}`)
  return (dispatch) => {
    API.votePost(id, data.option, path).then(
      () => dispatch(actionCreators.votar(id, voto, path, fromPost))
    )
  }
}