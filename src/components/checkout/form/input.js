import PropTypes from 'prop-types';
import Abbreviation from './abbreviation';
import Error from '../error';

/**
 * Input component.
 *
 * @param handleOnChange
 * @param value
 * @param name
 * @param type
 * @param label
 * @param placeholder
 * @param required
 * @param containerClasses
 * @param isShipping
 * @param errors
 * @returns {*}
 * @constructor
 */
const Input = (
  {
    handleOnChange,
    value,
    name,
    type,
    label,
    placeholder,
    required,
    containerClasses,
    isShipping,
    errors
  }) => {
  const inputId = `${name}-${isShipping ? 'shipping' : 'billing'}`;

  return (
    <div className={containerClasses}>
      <label htmlFor={inputId} className="text-sm text-gray-700">
        {label || ''}
        <Abbreviation required={required}/>
      </label>
      <input id={inputId}
             type={type}
             name={name}
             onChange={handleOnChange}
             value={value}
             placeholder={placeholder}
             className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      <Error errors={errors} fieldName={name}/>
    </div>
  );
};

Input.propTypes = {
  handleOnChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  containerClasses: PropTypes.string
};

Input.defaultProps = {
  handleOnChange: () => null,
  value: '',
  name: '',
  type: 'text',
  label: '',
  placeholder: '',
  required: false,
  containerClasses: '',
  isShipping: false,
  errors: {}
};

export default Input;