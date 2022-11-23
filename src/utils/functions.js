import DOMPurify from 'dompurify';
import validator from 'validator';

/**
 * Sanitize text when used inside dangerouslySetInnerHTML.
 *
 * @param content
 * @returns {*}
 */
export const sanitize = (content) => {
  return process.browser ? DOMPurify.sanitize(content) : content;
};

/**
 * Returns true if the value has an empty state/value.
 *
 * @param val
 * @returns {boolean|boolean}
 */
export const isEmpty = (val) =>
  val === undefined ||
  val === null ||
  (typeof val === 'object' && !Object.keys(val).length) ||
  (typeof val === 'string' && !val.trim().length);

/**
 * Adds the error data.
 *
 * @param value
 * @param errorContent
 * @param min
 * @param max
 * @param type
 * @param required
 * @returns {string}
 */
export const addErrorData = (value, errorContent, min, max, type = '', required) => {
  if (required && validator.isEmpty(value)) {
    return `${errorContent} is required`;
  }

  if (required && !validator.isLength(value, {min, max})) {
    return `${errorContent} must be ${min} to ${max} characters`;
  }

  if (required && type === 'email' && !validator.isEmail(value)) {
    return `${errorContent} is not valid`;
  }

  if (required && type === 'phone' && !validator.isMobilePhone(value)) {
    return `${errorContent} is not valid`;
  }

  return '';
};

/**
 * Gets the sanitized value.
 *
 * @param value
 * @param type
 * @returns {*|string}
 */
export const getSanitizedData = (value, type) => {
  value = validator.trim(value);
  value = type === 'email'
    ? validator.normalizeEmail(value)
    : value;

  return validator.escape(value);
};
