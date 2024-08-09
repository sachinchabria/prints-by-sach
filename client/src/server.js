import axios from 'axios';

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers['Content-Type'] = 'application/json';

/**
 * Get Posts Created Within the Last 4 Weeks
 */
export const getPostsShort = () => axios.get('/blog/posts/?time_range=short');

/**
 * Get Posts Created Within the Last 6 Months
 */
export const getPostsMedium = () => axios.get('/blog/posts/?time_range=medium');

/**
 * Get All Posts (All Time)
 */
export const getPostsLong = () => axios.get('/blog/posts/?time_range=long');

/**
 * Get a Post
 */
export const getPost = slug => axios.get(`/blog/posts/${slug}`);

/**
 * Get a List of All Tags
 */
export const getTags = () => axios.get('/blog/tags/');

/**
 * Get a Tag
 */
export const getTag = (slug) =>
  axios.get(`/blog/tags/${slug}`);

/**
 * Create a Comment
 */
export const createComment = (postId, author, body) => {
  axios.post('/blog/comments/new/', {
    post: postId,
    author: author,
    body: body,
  });
};
