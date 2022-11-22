import {useContext, useState} from 'react';
import cx from 'classnames';

import {AppContext} from '../../context';
import UserInfo from './user-info';
import {
  handleBillingDifferentThanShipping,
  handlePaymentCheckout,
  setCountryStates
} from '../../utils/checkout';
import Checkbox from './form/checkbox';
import OrderDetails from './order-details';
import PaymentMethods from './payment-methods/payment-methods';
import {
  validateAndGetSanitizedFormData
} from '../../validator/checkout-validator';

/**
 * Default user info.
 *
 * @type {{firstName: string, lastName: string, country: string, address2: string, city: string, phone: string, address1: string, postcode: string, company: string, state: string, email: string, errors: null}}
 */
const defaultUserInfo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  postcode: '',
  email: '',
  phone: '',
  company: '',
  errors: null
};

/**
 * Checkout form component.
 *
 * @param countries
 * @returns {*}
 * @constructor
 */
const CheckoutForm = ({countries}) => {
  const {billingCountries, shippingCountries} = countries || {};

  const initialState = {
    billing: {
      ...defaultUserInfo
    },
    shipping: {
      ...defaultUserInfo
    },
    billingDifferentThanShipping: false,
    paymentMethod: 'bacs'
  };

  const [cart, setCart] = useContext(AppContext);
  const [inputData, setInputData] = useState(initialState);
  const [error, setError] = useState(null);
  const [shippingStates, setShippingStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] = useState(false);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [createdOrderData, setCreatedOrderData] = useState({});

  /**
   * Handles the form submit.
   * Makes create order API request if form is valid.
   * Redirects the user to returned order payment url.
   *
   * @param e
   */
  const onFormSubmit = async (e) => {
    e.preventDefault();

    const billingValidationResult = inputData?.billingDifferentThanShipping
      ? validateAndGetSanitizedFormData(inputData?.billing, billingStates?.length)
      : {
        errors: null,
        isValid: true
      };
    const shippingValidationResult = validateAndGetSanitizedFormData(inputData?.shipping, shippingStates?.length);

    setInputData({
      ...inputData,
      billing: {
        ...inputData.billing,
        errors: billingValidationResult.errors
      },
      shipping: {
        ...inputData.shipping,
        errors: shippingValidationResult.errors
      }
    });

    const isValidForm = billingValidationResult.isValid && shippingValidationResult.isValid;
    if (!isValidForm) return null;

    const createdOrderData = await handlePaymentCheckout(
      inputData,
      cart?.cartItems,
      setError,
      setCart,
      setIsOrderProcessing,
      setCreatedOrderData
    );

    const {orderId} = createdOrderData;
    if (orderId) {
      alert(`Order #${orderId} successfully placed!`);
    }

    setError(null);
  };

  /**
   * Form elements change handler.
   *
   * @param e
   * @param isShipping
   * @param isBillingOrShipping
   * @returns {Promise<void>}
   */
  const handleOnChange = async (e, isShipping = false, isBillingOrShipping = false) => {
    const {target} = e || {};

    if (target.name === 'billingDifferentThanShipping') {
      handleBillingDifferentThanShipping(inputData, setInputData, target);
    } else if (isBillingOrShipping) {
      isShipping
        ? await onShippingChange(target)
        : await onBillingChange(target);
    } else {
      const newInputDataState = {
        ...inputData,
        [target.name]: target.value
      };
      setInputData(newInputDataState);
    }
  };

  /**
   * Shipping user info change handler.
   *
   * @param target
   * @returns {Promise<void>}
   */
  const onShippingChange = async (target) => {
    const newInputDataState = {
      ...inputData,
      shipping: {
        ...inputData?.shipping,
        [target.name]: target.value
      }
    };

    setInputData(newInputDataState);
    await setCountryStates(target, setShippingStates, setIsFetchingShippingStates);
  };

  /**
   * Billing user info change handler.
   *
   * @param target
   * @returns {Promise<void>}
   */
  const onBillingChange = async (target) => {
    const newInputDataState = {
      ...inputData,
      billing: {
        ...inputData?.billing,
        [target.name]: target.value
      }
    };

    setInputData(newInputDataState);
    await setCountryStates(target, setBillingStates, setIsFetchingBillingStates);
  };


  return (
    <>
      {cart ? (
        <form className="px-2" onSubmit={onFormSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="shipping-details">
              <h2 className="text-xl font-medium mb-4">Shipping details</h2>
              <UserInfo input={inputData?.shipping}
                        countries={shippingCountries}
                        states={shippingStates}
                        onChange={(e) => handleOnChange(e, true, true)}
                        isFetchingStates={isFetchingShippingStates}
                        isShipping
              />
              <div>
                <Checkbox
                  name="billingDifferentThanShipping"
                  checked={inputData?.billingDifferentThanShipping}
                  handleOnChange={handleOnChange}
                  label="Billing different than shipping"
                  containerClassNames="mb-4 pt-4"
                />
              </div>
              {inputData?.billingDifferentThanShipping ? (
                <div className="billing-details">
                  <h2 className="text-xl font-medium mb-4">Billing details</h2>
                  <UserInfo
                    input={inputData?.billing}
                    countries={billingCountries?.length ? billingCountries : shippingCountries}
                    states={billingStates}
                    onChange={(e) => handleOnChange(e, false, true)}
                    isFetchingStates={isFetchingBillingStates}
                    isShipping={false}
                    isBillingOrShipping
                  />
                </div>
              ) : null}
            </div>
            <div className="order-details">
              <h2 className="text-xl font-medium mb-4">
                Order details
              </h2>
              <OrderDetails cart={cart}/>
              <div className="payment-methods">
                <h2 className="text-xl mb-4">
                  Select your payment method
                </h2>
                <PaymentMethods input={inputData} onChange={handleOnChange}/>
              </div>
              <div className="checkout-button mt-5">
                <button
                  type="submit"
                  disabled={isOrderProcessing}
                  className={cx(
                    'bg-purple-500 text-white px-5 py-3 rounded-sm w-auto xl:w-full',
                    {'opacity-50': isOrderProcessing}
                  )}>
                  {!isOrderProcessing ? 'Place order' : 'Processing order...'}
                </button>
              </div>
              {error && <p className="mt-2 text-center">
                Error : {error}. Please try again
              </p>}
            </div>
          </div>
        </form>
      ) : null}
    </>
  );
};

export default CheckoutForm;