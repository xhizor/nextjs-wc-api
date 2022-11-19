/**
 * Error component.
 *
 * @param errors
 * @param fieldName
 * @returns {*}
 * @constructor
 */
const Error = ({errors, fieldName}) => {
  return (
    errors && errors.hasOwnProperty(fieldName)
      ? <div className="d-block text-red-500">{errors[fieldName]}</div>
      : null
  )
};

export default Error;