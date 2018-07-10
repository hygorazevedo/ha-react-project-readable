import { combineReducers } from 'redux'
import categorias from './categorias'
import comentarios from './comentarios'
import comentario from './comentario'
import ordem from './ordem'
import postagens from './postagens'
import postagem from './postagem'

export default combineReducers({
  categorias: categorias,
  comentarios: comentarios,
  comentario: comentario,
  postagens: postagens,
  postagem: postagem,
  ordem: ordem
})
