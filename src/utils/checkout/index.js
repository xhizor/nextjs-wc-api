import axios from 'axios';
import {WC_STATES_URL} from '../constants/endpoints';

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