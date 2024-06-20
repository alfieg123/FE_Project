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

export const voteOnArticle = (id, voteAdjustment) => {
  return api.patch(`/api/articles/${id}`, {inc_votes : voteAdjustment})
    .then(response => {
        return response.data.article
    });
}

export const postComment = (id, { username, body }) => {
  return api.post(`/api/articles/${id}/comments`, { username, body })
  .then((response) => {
        return response.data.comment});
};

export const deleteComment = (comment_id) => {
  return api.delete(`/api/comments/${comment_id}`);
};
