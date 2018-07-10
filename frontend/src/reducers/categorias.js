import {
  CARREGAR_CATEGORIAS,
  SELECIONAR_CATEGORIA
} from '../actions/consts'

export default function categorias(state = {}, action) {
  switch(action.type) {
    case CARREGAR_CATEGORIAS:
      return {
        ...state,
        categorias: action.categorias
      }
    case SELECIONAR_CATEGORIA:
      return {
        ...state,
        categoria: action.categoria
      }
    default:
      return state
  }
}