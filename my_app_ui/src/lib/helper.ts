import { useNavigate } from "react-router-dom";

/**
 * Converts a string to a slug format (lowercase, words separated by hyphens).
 *
 * @param {string} input - The input string to be converted.
 * @returns {string} - The slugified version of the input string.
 */
export const toSlug = (input: string): string => {
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

/**
 * Converts a slug to a capitalized title format (words separated by spaces, each word capitalized).
 *
 * @param {string} slug - The slug string to be converted.
 * @returns {string} - The human-readable, capitalized title.
 */
export const toTitle = (slug: string | undefined): string => {
  if (!slug || typeof slug !== "string") {
    throw new Error("Slug must be a non-empty string");
  }

  return slug
    .trim() // Remove leading/trailing whitespace
    .replace(/-/g, " ") // Replace hyphens with spaces
    .replace(/_/g, " ") // Replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

/**
 * Generates breadcrumb items dynamically based on the current path.
 *
 * @param {string} pathname - The current path.
 * @returns {Array<{ title: string; href?: string }>} - Breadcrumb items with titles and URLs.
 */
export const generateBreadcrumbItems = (
  pathname: string
): Array<{ title: string; href?: string }> => {
  const pathSegments = pathname.split("/").filter(Boolean); // Split and filter empty segments

  return pathSegments.map((segment, index) => {
    const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return {
      title: toTitle(segment),
      href: url !== pathname ? url : undefined, // Add `href` only for non-active items
    };
  });
};

/**
 * Groups sidebar items and their subitems based on parent-child relationships.
 *
 * @param {any[]} pages - Array of pages to group into menu items.
 * @param {ReturnType<typeof useNavigate>} navigate - React Router's navigate function for navigation.
 * @returns {any[]} - Grouped menu items for the sidebar.
 */
export const groupSidebarItems = (
  pages: any[],
  navigate: ReturnType<typeof useNavigate>
) => {
  const groupedItems: any[] = [];

  // Filter parent and child items from pages
  const parentItems = pages.filter((item) => !item.parent_page);
  const childItems = pages.filter((item) => item.parent_page);

  parentItems.forEach((parent) => {
    const children = childItems
      .filter((child) => child.parent_page === parent.name)
      .map((child) => ({
        key: child.name,
        label: child.label,
        onClick: () => navigate(toSlug(child.label)),
      }));

    groupedItems.push({
      key: parent.name,
      label: parent.label,
      onClick: () => navigate(toSlug(parent.label)),
      children: children.length > 0 ? children : undefined,
    });
  });

  return groupedItems;
};

/**
 * Returns an array of path segments derived from the current pathname.
 *
 * @param {string} pathname - The current path.
 * @returns {string[]} - Array of path segments converted into human-readable titles.
 */
export const getPathSegments = (pathname: string): string[] => {
  // Get path segments from the current pathname

  return pathname
    .replace(/\/$/, "") // Remove trailing slash if present
    .split("/") // Split the path into segments
    .filter(Boolean) // Remove any empty segments
    .map((item) => toTitle(item)) // Convert slugs to titles
    .filter((item): item is string => item !== null); // Ensure all items are non-null strings
};
