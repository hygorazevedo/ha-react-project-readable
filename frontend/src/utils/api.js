const url = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${url}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPosts = () =>
  fetch(`${url}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getPost = (id) =>
  fetch(`${url}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const createPost = (data) =>
  fetch(`${url}/posts`, { 
    headers, 
    method: 'post', 
    body: JSON.stringify(data) 
  }).then(res => res.json())
    .then(data => data)

export const editPost = (data) =>
  fetch(`${url}/posts/${data.id}`, { 
    headers, 
    method: 'put', 
    body: JSON.stringify(data) 
  }).then(res => res.json())
    .then(data => data)

export const deletePost = (id) =>
  fetch(`${url}/posts/${id}`, { 
    headers, 
    method: 'delete'
  }).then(res => res.json())
    .then(data => data)

export const getComments = (id) => fetch(
  `${url}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getComment = (id) => fetch(
  `${url}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const createComment = (data) => fetch(
  `${url}/comments`, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(data => data)

export const editComment = (data) => fetch(
  `${url}/comments/${data.id}`, {
    headers,
    method: 'put',
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(data => data)

export const deleteComment = (id) => fetch(
  `${url}/comments/${id}`,
  {
    headers,
    method: 'delete'
  }
)

export const votePost = (data, option, path) => fetch(
  `${url}/${path}/${data}`,
  {
    headers,
    method: 'post',
    body: JSON.stringify(option)
  }
)
