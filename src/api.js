import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-news-huw.herokuapp.com/api'
})

export const getData = (endpoint, queries) => {
  const URL = `/${endpoint}`;
  return request.get(URL, { params: queries })
    .then(({ data }) => {
      return data
    })
}

export const changeVote = (endpoint, id, value) => {
  const URL = `/${endpoint}/${id}`;
  return request.patch(URL, { inc_votes: value })
    .then(({ data }) => {
      return data;
    })
}

export const postComment = (article_id, username, body) => {
  return request.post(`/articles/${article_id}/comments`, { username, body })
    .then(({ data: { comment } }) => comment)
}

export const postTopic = (topic) => {
  return request.post('/topics', topic)
    .then(({ data: { topic } }) => topic)
}

export const postUser = (user) => {
  return request.post('/users', user)
    .then(({ data: { user } }) => user)
}

// export const postArticle = (article) => {
//   return request.post('/articles', article)
//     .then(({ data: { article } }) => article)
// }

export const postArticle = async (articleData) => {
  const { data: { article } } = await request.post('/articles', articleData);
  return article;
}

// export const deleteComment = (id) => {
//   return request.delete(`/comments/${id}`)
// }

export const deleteComment = async id => {
  return await request.delete(`/comments/${id}`);
}

export const deleteArticle = (id) => {
  return request.delete(`/articles/${id}`)
}
