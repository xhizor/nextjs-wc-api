import PropTypes from 'prop-types';

/**
 * Abbreviation component.
 *
 * @param required
 * @returns {null|*}
 * @constructor
 */
const Abbreviation = ({required}) => {
  if (!required) return null;

  return (
    <abbr className="text-red-500 no-underline" title="Required field">
      *
    </abbr>
  )
};

Abbreviation.propTypes = {
  required: PropTypes.bool
};

Abbreviation.defaultProps = {
  required: false
};

export default Abbreviation;