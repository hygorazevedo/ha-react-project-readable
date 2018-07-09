import * as CONSTS from './consts'

export function loadCategories(categories) {
  return {
    type: CONSTS.LOAD_CATEGORIES,
    categories
  }
}
export function loadCategoryPosts(category, posts) {
  return {
    type: CONSTS.LOAD_CATEGORY_POSTS,
    category,
    posts
  }
}
export function selectCategory(category) {
  return {
    type: CONSTS.SELECT_CATEGORY,
    category
  }
}


export function loadPost(post) {
  return {
    type: CONSTS.LOAD_POST,
    post
  }
}
export function loadPosts(posts) {
  return {
    type: CONSTS.LOAD_POSTS,
    posts
  }
}
export function removePost(id) {
  return {
    type: CONSTS.REMOVE_POST,
    id
  }
}


export function loadComment(id, comment) {
  return {
    type: CONSTS.LOAD_COMMENT,
    id,
    comment
  }
}
export function loadComments(id, comments) {
  return {
    type: CONSTS.LOAD_COMMENTS,
    id,
    comments
  }
}
export function removeComment(id) {
  return {
    type: CONSTS.REMOVE_COMMENT,
  }
}
export function vote(id, vote, path, fromPost) {
  let type

  if (fromPost === true) {
    type = CONSTS.VOTE_POST_FROM_POST
  } else {
    type = (path === 'posts') ? CONSTS.VOTE_POST : CONSTS.VOTE_COMMENT
  }

  return {
    type: type,
    id,
    vote
  }
}


export function selectOrder(order) {
  return {
    type: CONSTS.SELECT_ORDER,
    order
  }
}