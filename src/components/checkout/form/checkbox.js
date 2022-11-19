import PropTypes from 'prop-types';

/**
 * Checkbox component.
 *
 * @param handleOnChange
 * @param checked
 * @param name
 * @param label
 * @param placeholder
 * @param containerClassNames
 * @returns {*}
 * @constructor
 */
const Checkbox = ({handleOnChange, checked, name, label, placeholder, containerClassNames}) => {
  return (
    <div className={containerClassNames}>
      <label className="text-md text-gray-700 flex items-center cursor-pointer"
             htmlFor={name}>
        <input
          id={name}
          name={name}
          type="checkbox"
          placeholder={placeholder}
          checked={checked}
          onChange={handleOnChange}
        />
        <span className="ml-2">{label || ''}</span>
      </label>
    </div>
  )
};

Checkbox.propTypes = {
  handleOnChange: PropTypes.func,
  checked: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  containerClassNames: PropTypes.string
};

Checkbox.defaultProps = {
  handleOnChange: () => null,
  checked: false,
  name: '',
  label: '',
  placeholder: '',
  errors: {},
  containerClassNames: ''
};

export default Checkbox;