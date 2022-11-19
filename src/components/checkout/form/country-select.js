import PropTypes from 'prop-types';

import Abbreviation from './abbreviation';
import Error from '../error';
import {ArrowDown} from '../../icons';

/**
 * Country select component.
 *
 * @param input
 * @param handleOnChange
 * @param countries
 * @param isShipping
 * @returns {*}
 * @constructor
 */
const CountrySelect = ({input, handleOnChange, countries, isShipping}) => {
  const {country, errors} = input || {};
  const inputId = `country-${isShipping ? 'shipping' : 'billing'}`;

  return (
    <div className="mb-3">
      <label className="text-sm text-gray-700" htmlFor={inputId}>
        Country
        <Abbreviation required/>
      </label>
      <div className="relative w-full border-none">
        <select onChange={handleOnChange}
                value={country}
                id={inputId}
                name="country"
                className="bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full">
          <option value="">Select a country...</option>
          {
            countries?.length && countries.map(({countryCode, countryName}) => (
              <option key={countryCode} data-countrycode={countryCode}
                      value={countryCode}>
                {countryName}
              </option>
            ))
          }
        </select>
        <span className="absolute right-0 mr-1 text-gray-500"
              style={{top: '25%'}}>
          <ArrowDown width={24} height={24} className="fill-current"/>
        </span>
      </div>
      <Error errors={errors} fieldName="country"/>
    </div>
  )
};

CountrySelect.propTypes = {
  input: PropTypes.object,
  handleOnChange: PropTypes.func,
  countries: PropTypes.array,
  isShipping: PropTypes.bool
};

CountrySelect.defaultProps = {
  input: {},
  handleOnChange: () => null,
  countries: [],
  isShipping: false
};

export default CountrySelect;