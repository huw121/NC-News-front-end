import axios from 'axios';

const request = axios.create({
  baseURL: 'https://nc-news-huw.herokuapp.com/api'
})

export const getData = (endpoint, queries = null) => {
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
