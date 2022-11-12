import DOMPurify from 'dompurify';

/**
 * Sanitize text when used inside dangerouslySetInnerHTML.
 *
 * @param content
 * @returns {*}
 */
export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};