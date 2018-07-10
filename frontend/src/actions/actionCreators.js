import * as CONSTS from './consts'

export function carregarCategorias(categorias) {
  return {
    type: CONSTS.CARREGAR_CATEGORIAS,
    categorias
  }
}

export function selecionarCategoria(categoria) {
  return {
    type: CONSTS.SELECIONAR_CATEGORIA,
    categoria
  }
}

export function carregarPostagensPorCategoria(categoria, postagens) {
  return {
    type: CONSTS.CARREGAR_POSTAGENS_POR_CATEGORIA,
    categoria,
    postagens
  }
}

export function carregarPostagens(postagens) {
  return {
    type: CONSTS.CARREGAR_POSTAGENS,
    postagens
  }
}

export function selecionarOrdem(ordem) {
  return {
    type: CONSTS.SELECIONAR_ORDEM,
    ordem
  }
}

export function carregarPostagem(postagem) {
  return {
    type: CONSTS.CARREGAR_POSTAGEM,
    postagem
  }
}

export function excluirPostagem(id) {
  return {
    type: CONSTS.EXCLUIR_POSTAGEM,
    id
  }
}

export function carregarComentarios(id, comentarios) {
  return {
    type: CONSTS.CARREGAR_COMENTARIOS,
    id,
    comentarios
  }
}

export function carregarComentario(id, comentario) {
  return {
    type: CONSTS.CARREGAR_COMENTARIO,
    id,
    comentario
  }
}

export function excluirComentario(id) {
  return {
    type: CONSTS.EXCLUIR_COMENTARIO,
  }
}

export function votar(id, voto, path, fromPost) {
  let type

  if(fromPost === true) {
    type = CONSTS.VOTAR_POSTAGEM_FROMPOST
  } else {
    type = (path === 'posts') ? CONSTS.VOTAR_POSTAGEM : CONSTS.VOTAR_COMENTARIO
  }

  return {
    type: type,
    id,
    voto
  }
}