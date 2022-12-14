import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5002"})

export const updatePost = (id, data) => API.put(`/posts/${id}`, data)
export const deletePost = (id, user) => API.put(`/posts/${id}/delete`, user)

export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);

export const likePost = (id, userId)=> API.put(`/posts/${id}/like`, {
  userId: userId
})

// Comment
export const commentPost = (id, username, userId, comment, commentId)=> API.put(`/posts/${id}/comment`, {
  username: username,
  userId: userId,
  comments: comment,
  commentId: commentId,
})

export const getCommentsPost = (id)=> API.get(`/posts/${id}/comment`)

export const deleteCommentPost = (id, commentId, userId) =>
  API.put(`/posts/${id}/comment/${commentId}/delete`,
    {userId: userId }
  );
export const getAllPosts = ()=> API.get('/posts')