import axios from 'axios';

import {WC_CART_URL} from '../constants/endpoints';
import {
  getCartSession,
  storeCartSession,
  WC_CART_SESSION_KEY
} from './session';
import {getCartConfig} from './api';

/**
 * Adds the product to the card.
 *
 * @param {int} productId
 * @param {int} qty
 * @param {Function} setCart
 * @param {Function} setIsAddedToCart
 * @param {Function} setIsLoading
 */
export const addToCart = async (productId, qty = 1, setCart, setIsAddedToCart, setIsLoading) => {
  setIsLoading(true);
  const storedSession = getCartSession();
  const cartConfig = getCartConfig();

  try {
    const data = {
      product_id: productId,
      quantity: qty
    };
    const response = await axios.post(WC_CART_URL, data, cartConfig);
    if (!storedSession) {
      storeCartSession(response?.headers?.[WC_CART_SESSION_KEY]);
    }

    setIsAddedToCart(true);
    setIsLoading(false);
    setCartData(setCart);
  } catch (err) {
    setIsLoading(false);
    console.log('err', err);
  }
};

/**
 * Updates the cart for a given cart key.
 *
 * @param cartKey
 * @param quantity
 * @param setCart
 * @param setUpdatingProduct
 * @returns {Promise<void>}
 */
export const updateCart = async (cartKey, quantity = 1, setCart, setUpdatingProduct) => {
  const cartConfig = getCartConfig();
  setUpdatingProduct(true);

  const data = {
    quantity
  };
  try {
    await axios.put(`${WC_CART_URL}${cartKey}`, data, cartConfig);
    setCartData(setCart, setUpdatingProduct);
  } catch (err) {
    console.log('err', err);
    setUpdatingProduct(false);
  }
};

/**
 * Updates the cart data in the app store.
 *
 * @param {Function} setCart
 * @param {Function} setProcessing
 * @returns {Promise<void>}
 */
export const setCartData = async (setCart, setProcessing = () => {
}) => {
  const cartConfig = getCartConfig();

  try {
    const response = await axios.get(WC_CART_URL, cartConfig);
    const formattedCartData = getFormattedCartData(response?.data || []);
    setCart(formattedCartData);
    setProcessing(false);
  } catch (err) {
    console.log('err', err);
    setProcessing(false);
  }
};

/**
 * Deletes the cart item by a given cart key.
 *
 * @param cartKey
 * @param setCart
 * @param setDeleteCartItemProcessing
 * @returns {Promise<void>}
 */
export const deleteCartItem = async (cartKey, setCart, setDeleteCartItemProcessing) => {
  const cartConfig = getCartConfig();
  setDeleteCartItemProcessing(true);

  try {
    await axios.delete(`${WC_CART_URL}${cartKey}`, cartConfig);
    setCartData(setCart, setDeleteCartItemProcessing);
  } catch (err) {
    console.log('err', err);
    setDeleteCartItemProcessing(false);
  }
};

/**
 * Clear the cart data.
 *
 * @param setCart
 * @param setClearCartProcessing
 * @returns {Promise<void>}
 */
export const clearCart = async (setCart, setClearCartProcessing) => {
  const cartConfig = getCartConfig();
  setClearCartProcessing(true);

  try {
    await axios.delete(WC_CART_URL, cartConfig);
    setCartData(setCart, setClearCartProcessing);
  } catch (err) {
    console.log('err', err);
    setClearCartProcessing(false);
  }
};

/**
 * Calculates the total quantity and price of the cart items.
 *
 * @param cartItems
 * @returns {{totalQuantity: number, totalPrice: number}}
 */
const calculateCartQuantityAndPrice = (cartItems) => {
  const quantityAndPrice = {
    totalQuantity: 0,
    totalPrice: 0
  };

  if (!cartItems?.length) return quantityAndPrice;

  cartItems.forEach((item, _) => {
    quantityAndPrice.totalQuantity += item?.quantity ?? 0;
    quantityAndPrice.totalPrice += item?.line_total ?? 0;
  });

  return quantityAndPrice;
};

/**
 * Gets the formatted cart data.
 *
 * @param cartData
 * @returns {null|{totalQuantity: number, totalPrice: number, cartItems: ({length}|*|*[])}}
 */
const getFormattedCartData = (cartData) => {
  if (!cartData?.length) return null;

  const cartTotal = calculateCartQuantityAndPrice(cartData);
  return {
    cartItems: cartData || [],
    ...cartTotal
  }
};