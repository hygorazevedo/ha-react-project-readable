import {
  CARREGAR_COMENTARIO,
  EXCLUIR_COMENTARIO
} from '../actions/consts'

const initialStateComentario = {
  comentarios: [],
  comentario: {}
}

export default function comentario(state = initialStateComentario, action) {
  switch (action.type) {
    case CARREGAR_COMENTARIO:
      return {
        ...state,
        comentarios: state.comentarios.concat(action.comentario),
        comentario: action.comentario
      }
    case EXCLUIR_COMENTARIO:
      return {
        ...state,
        comentarios: state.comentarios.filter(comentario => comentario.id !== action.id)
      }
    default:
      return state
  }
}