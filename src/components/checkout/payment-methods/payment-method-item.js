import PropTypes from 'prop-types';

/**
 * Payment method item component.
 *
 * @param selectedPaymentMethod
 * @param paymentMethodItem
 * @param onChange
 * @returns {*}
 * @constructor
 */
const PaymentMethodItem = ({selectedPaymentMethod, paymentMethodItem, onChange}) => {
  const {name, value} = paymentMethodItem;
  const isChecked = selectedPaymentMethod === value;

  return (
    <div className="mt-2">
      <label className="cursor-pointer">
        <input name="paymentMethod" type="radio" onChange={onChange}
               value={value} className="mr-3"
               checked={isChecked}
        />
        <span>{name}</span>
      </label>
    </div>
  )
};

PaymentMethodItem.propTypes = {
  selectedPaymentMethod: PropTypes.string,
  paymentMethodItem: PropTypes.exact({
    name: PropTypes.string,
    value: PropTypes.string
  }),
  onChange: PropTypes.func
};

export default PaymentMethodItem;

