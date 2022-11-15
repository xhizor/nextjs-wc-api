/**
 * WC cart session ID.
 *
 * @type {string}
 */
export const WC_CART_SESSION_KEY = 'x-wc-session';

/**
 * Gets the active cart session.
 *
 * @returns {string}
 */
export const getCartSession = () => {
  return localStorage.getItem(WC_CART_SESSION_KEY);
};

/**
 * Sets the active cart session.
 *
 * @param session
 * @returns {null}
 */
export const storeCartSession = (session) => {
  if (!session) return null;

  localStorage.setItem(WC_CART_SESSION_KEY, session);
};