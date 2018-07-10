import {
  CARREGAR_POSTAGEM,
  EXCLUIR_POSTAGEM,
  VOTAR_POSTAGEM_FROMPOST
} from '../actions/consts'

const initialStatePostagem = {
  postagens: [],
  postagem: {}
}

export default function postagem(state = initialStatePostagem, action) {
  switch (action.type) {
    case CARREGAR_POSTAGEM:
      return {
        ...state,
        postagem: action.postagem
      }
    case EXCLUIR_POSTAGEM:
      return {
        ...state,
        postagens: state.postagens.filter(post => post.id !== action.id)
      }
    case VOTAR_POSTAGEM_FROMPOST:
      return {
        ...state,
        postagem: {
          ...state.postagem,
          voteScore: state.postagem.voteScore + action.voto
        }
      }
    default:
      return state
  }
}