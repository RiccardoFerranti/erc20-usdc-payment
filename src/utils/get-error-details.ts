/**
 * Extracts detailed error message from a given error string.
 *
 * @param {string} error - The error string to extract details from.
 * @returns {string} - The extracted error details or a default error message if no details are found.
 */
const getErrorDetails = (error: string): string => {
  const details = error?.match(/Details:\s*(.*)/)?.[1] || 'An error occurred. Please try again.';
  return details;
};

export default getErrorDetails;
