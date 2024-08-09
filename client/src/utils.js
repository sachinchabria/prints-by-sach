import { formatDistanceToNow } from 'date-fns';

/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 */
export const catchErrors = fn => {
	return function(...args) {
		return fn(...args).catch((err) => {
			console.error(err);
		})
	}
}

/**
 * Formats a given date string into "MMMM dd, yyyy" format.
 * @param {string} date - The date string to format.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};