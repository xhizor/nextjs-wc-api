import React, {useState, useEffect, useContext} from 'react';

/**
 * App context.
 *
 * @type {React.Context<({}|(function(...[*]=)))[]>}
 */
export const AppContext = React.createContext([
  {},
  () => {
  }
]);

/**
 * App context provider.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const AppProvider = (props) => {
  const [cart, setCart] = useState(null);
  const APP_CART_KEY = 'app-cart';

  useEffect(() => {
    if (!process.browser) return;
    let cartData = localStorage.getItem(APP_CART_KEY);
    cartData = cartData !== null ? JSON.parse(cartData) : '';
    setCart(cartData);
  }, []);

  useEffect(() => {
    if (!process.browser) return;
    localStorage.setItem(APP_CART_KEY, JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
