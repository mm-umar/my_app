/**
 * Converts a string to a slug format (lowercase, words separated by hyphens).
 *
 * @param {string} input - The input string to be converted.
 * @returns {string} - The slugified version of the input string.
 */
const toSlug = (input: string): string => {
  if (!input || typeof input !== "string") {
    throw new Error("Input must be a non-empty string");
  }

  return input
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/\band\b/g, "-") // Replace "and" with a hyphen
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]/g, ""); // Remove non-alphanumeric characters except hyphens
};

export default toSlug;
