/**
 * Extracts the error message from an unknown error type.
 *
 * @param {unknown} error - The error to extract the message from.
 * @returns {string} - The extracted error message.
 */
const getErrorMessage = (error: unknown): string => {
  let errorMessage: string;
  if (error instanceof Error) {
    // If it's a standard Error object
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    // If it's a string
    errorMessage = error;
  } else {
    // For other types of errors, convert to string
    errorMessage = JSON.stringify(error);
  }
  return errorMessage;
};

export default getErrorMessage;
