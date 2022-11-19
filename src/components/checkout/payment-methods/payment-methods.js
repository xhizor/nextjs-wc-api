import PropTypes from 'prop-types';

import Error from '../error';
import PaymentMethodItem from './payment-method-item';

/**
 * Available payment methods.
 *
 * @type {({name: string, value: string}|{name: string, value: string}|{name: string, value: string}|{name: string, value: string}|{name: string, value: string})[]}
 */
const PAYMENT_METHODS = [
  {
    name: 'Direct Bank Transfer',
    value: 'bacs'
  },
  {
    name: 'PayPal',
    value: 'paypal'
  },
  {
    name: 'Check Payments',
    value: 'cheque'
  },
  {
    name: 'Cash on Delivery',
    value: 'cod'
  },
  {
    name: 'JCC',
    value: 'jccpaymentgatewayredirect'
  },
  {
    name: 'CC Avenue',
    value: 'ccavenue'
  },
  {
    name: 'Stripe',
    value: 'stripe'
  }
];

/**
 * Payment methods component.
 *
 * @param input
 * @param onChange
 * @returns {*}
 * @constructor
 */
const PaymentMethods = ({input, onChange}) => {
  const {errors, paymentMethod} = input || {};

  return (
    <div className="mt-3">
      <Error errors={errors} fieldName='paymentMethod'/>
      {PAYMENT_METHODS.map(paymentMethodItem =>
        <PaymentMethodItem
          key={paymentMethodItem.value}
          onChange={onChange}
          selectedPaymentMethod={paymentMethod}
          paymentMethodItem={paymentMethodItem}/>
      )}
      <div className="mt-3">
        Please send a check to Store Name, Store Street, Store Town, Store State
        / County, Store Postcode.
      </div>
    </div>
  );
};

PaymentMethods.propTypes = {
  input: PropTypes.object,
  onChange: PropTypes.func
};

export default PaymentMethods;