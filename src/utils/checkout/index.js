import axios from 'axios';
import {WC_STATES_URL} from '../constants/endpoints';
import {clearCart} from '../cart';
import {createOrder, getCreateOrderData} from './order';

/**
 * Set the states for selected country.
 *
 * @param target
 * @param setStates
 * @param setIsFetchingStates
 * @returns {Promise<void>}
 */
export const setCountryStates = async (target, setStates, setIsFetchingStates) => {
  if (target.name !== 'country') return null;
  setIsFetchingStates(true);

  try {
    const countryCode = target[target.selectedIndex].getAttribute('data-countrycode');
    const states = await getStates(countryCode);
    setStates(states);
    setIsFetchingStates(false);
  } catch (err) {
    console.log('err', err);
    setIsFetchingStates(false);
  }
};

/**
 * Gets the states based on the country code.
 *
 * @param countryCode
 * @returns {Promise<*[]|*>}
 */
export const getStates = async (countryCode = '') => {
  if (!countryCode) {
    return [];
  }

  try {
    const {data} = await axios.get(WC_STATES_URL, {params: {countryCode}});
    return data?.states ?? [];
  } catch (err) {
    console.log('err', err);
    return [];
  }
};

/**
 * Handles the billing different than shipping state.
 *
 * @param input
 * @param setInput
 * @param target
 */
export const handleBillingDifferentThanShipping = (input, setInput, target) => {
  const newInputDataState = {
    ...input,
    [target.name]: !input.billingDifferentThanShipping
  };

  setInput(newInputDataState);
};

/**
 * Handles the payment checkout.
 *
 * @param input
 * @param products
 * @param setError
 * @param setCart
 * @param setIsOrderProcessing
 * @param setCreatedOrderData
 * @returns {Promise<{orderId: null, error: string}|null>}
 */
export const handlePaymentCheckout = async (input, products, setError, setCart, setIsOrderProcessing, setCreatedOrderData) => {
  setIsOrderProcessing(true);
  const orderData = getCreateOrderData(input, products);
  const customerOrderData = await createOrder(orderData, setError, '');
  const cartCleared = await clearCart(setCart, () => {
  });
  setIsOrderProcessing(false);

  if (!customerOrderData?.orderId || cartCleared?.error) {
    setError('Clear cart failed');
    return null;
  }

  setCreatedOrderData(customerOrderData);

  return customerOrderData;
};