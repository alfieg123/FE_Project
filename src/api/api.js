import axios from 'axios';

const baseURL = 'https://backendproject-o0uj.onrender.com';

const api = axios.create({
  baseURL,
});

export const fetchArticle = (id) => {
  return api.get(`/api/articles/${id}`)
    .then(response => {
        return response.data.article
    });
};

export const fetchComments = (id) => {
  return api.get(`/api/articles/${id}/comments`)
  .then(response => {
    return response.data.comments;
  });
};