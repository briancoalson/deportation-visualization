/**
 * Formats a UTC date string into a readable string in the format 'Month YYYY'
 *
 * @param {string} dateStr - The UTC date string to format.
 * @returns {string} - The formatted date string.
 */

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short',
    timeZone: 'UTC' // Ignore system's time zone so you get the date as is provided by the source.
  });
};