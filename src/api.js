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

export const postComment = (article_id, body) => {
  return request.post(`/articles/${article_id}/comments`, { body })
    .then(({ data: { comment } }) => comment)
}
