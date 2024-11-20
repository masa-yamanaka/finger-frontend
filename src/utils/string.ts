/**
 * Extracts the text before the first underscore in a string.
 * @param str - The string from which to extract the text.
 * @returns The text before the first underscore, or an empty string if no underscore exists.
 */
export const extractTextBeforeUnderscore = (str: string): string => {
  return str.includes("_") ? str.split("_")[0] : "";
};

/**
 * Validates an email address using a regular expression.
 * @param email - The email address to validate.
 * @returns A boolean indicating whether the email is valid.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
