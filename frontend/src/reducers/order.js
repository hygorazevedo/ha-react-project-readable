import {
    SELECT_ORDER
} from '../actions/consts'

const initialOrderState = {
  order: 'id'
}

export default function order (state = initialOrderState, action) {
  switch(action.type) {
    case SELECT_ORDER:
      return {
        ...state,
        order: action.order
      }
    default:
      return state
  }
}