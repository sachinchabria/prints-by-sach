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

/**
 * Get a List of All Prints
 */
export const getPrints = () => axios.get('/store/prints/');

/**
 * Get a Print
 */
export const getPrint = slug => axios.get(`/store/prints/${slug}/`);

/**
 * Get Cart
 */
export const getCart = () => axios.get('/store/cart/', { withCredentials: true });

/**
 * Add Item to Cart
 */
export const addToCart = (variant_id) => 
  axios.post(`/store/cart/add/${variant_id}/`, null, { withCredentials: true });

/**
 * Remove Item from Cart
 */
export const removeFromCart = (variant_id) => 
  axios.get(`/store/cart/remove/${variant_id}/`, { withCredentials: true });

/**
 * Update Item in Cart
 */
export const updateQuantity = async (variantId, quantity) => {
  await axios.get(`/store/cart/remove/${variantId}/`, { withCredentials: true });
  await axios.post(`/store/cart/add/${variantId}/?quantity=${quantity}`, null, { withCredentials: true });
};

/**
 * Create Checkout Session
 */
export const createCheckout = () => 
  axios.get('/store/create-checkout-session/', { withCredentials: true });
