import {
  CARREGAR_POSTAGENS,
  CARREGAR_POSTAGENS_POR_CATEGORIA,
  EXCLUIR_POSTAGEM,
  VOTAR_POSTAGEM
} from '../actions/consts'

const initialStatePostagens = {
  postagens: []
}

export default function postagens(state = initialStatePostagens, action) {
  switch (action.type) {
    case CARREGAR_POSTAGENS:
      return {
        ...state,
        postagens: action.postagens
      }
    case CARREGAR_POSTAGENS_POR_CATEGORIA:
      return {
        ...state,
        categoria: action.categoria,
        postagens: action.postagens
      }
    case EXCLUIR_POSTAGEM:
      return {
        ...state,
        postagens: state.postagens.filter(post => post.id !== action.id)
      }
    case VOTAR_POSTAGEM:
      return {
        ...state,
        postagens: state.postagens.map(postagem => {
          if (postagem.id === action.id) {
            postagem.voteScore = postagem.voteScore + action.voto
          }

          return postagem;
        })
      }
    default:
      return state
  }
}