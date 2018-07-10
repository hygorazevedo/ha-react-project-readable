import {
  SELECIONAR_ORDEM
} from '../actions/consts'

const initialStateOrdem = {
  ordem: 'id'
}

export default function ordem(state = initialStateOrdem, action) {
  switch (action.type) {
    case SELECIONAR_ORDEM:
      return {
        ...state,
        ordem: action.ordem
      }
    default:
      return state
  }
}