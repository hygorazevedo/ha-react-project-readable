import {
  CARREGAR_COMENTARIOS,
  VOTAR_COMENTARIO
} from '../actions/consts'

const initialStateComentarios = {
  comentarios: []
}

export default function comentarios(state = initialStateComentarios, action) {
  switch(action.type) {
    case CARREGAR_COMENTARIOS:
      return {
        ...state,
        comentarios: action.comentarios
      }
    case VOTAR_COMENTARIO:
      return {
        ...state,
        comentarios: state.comentarios.map(comentario => {
          if(comentario.id === action.id) {
            comentario.voteScore = comentario.voteScore + action.voto
          }

          return comentario;
        })
      }
    default:
      return state
  }
}