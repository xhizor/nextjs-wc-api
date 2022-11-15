import {getCartSession} from './session';

/**
 * Gets the cart config for the axios reqest config.
 *
 * @returns {{headers: {'X-Headless-CMS': boolean}}}
 */
export const getCartConfig = () => {
  const config = {
    headers: {
      'X-Headless-CMS': true
    }
  };

  const cartSession = getCartSession();
  if (cartSession) {
    config.headers['x-wc-session'] = cartSession;
  }

  return config;
};