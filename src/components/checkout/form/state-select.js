import PropTypes from 'prop-types';
import cx from 'classnames';
import {memo} from 'react';

import Abbreviation from './abbreviation';
import Error from '../error';

/**
 * State select component.
 *
 * @param handleOnChange
 * @param input
 * @param states
 * @param isFetchingStates
 * @param isShipping
 * @returns {null|*}
 * @constructor
 */
const StateSelect = ({handleOnChange, input, states, isFetchingStates, isShipping}) => {
  const {state, errors} = input || {};
  const inputId = `state-${isShipping ? 'shipping' : 'billing'}`;

  if (isFetchingStates) {
    return (
      <div className="mb-3">
        <label className="text-sm text-gray-700">
          State/County
          <Abbreviation required/>
        </label>
        <div className="relative w-full border-none">
          <select
            disabled
            value=""
            name="state"
            className="opacity-50 bg-gray-100 bg-opacity-50 border border-gray-500 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full"
          >
            <option value="">Loading...</option>
          </select>
        </div>
      </div>
    )
  }

  if (!states.length) {
    return null;
  }

  return (
    <div className="mb-3">
      <label className="text-sm text-gray-600" htmlFor={inputId}>
        State/County
        <Abbreviation required/>
      </label>
      <div className="relative w-full border-none">
        <select
          disabled={isFetchingStates}
          onChange={handleOnChange}
          value={state}
          name="state"
          className={cx(
            'bg-gray-100 bg-opacity-50 border border-gray-400 text-gray-500 appearance-none inline-block py-3 pl-3 pr-8 rounded leading-tight w-full',
            {'opacity-50': isFetchingStates}
          )}
          id={inputId}
        >
          <option value="">Select a state...</option>
          {states.map((state, index) => (
            <option key={state?.stateCode ?? index}
                    value={state?.stateName ?? ''}>
              {state?.stateName}
            </option>
          ))}
        </select>
      </div>
      <Error errors={errors} fieldName='state'/>
    </div>
  )
};

StateSelect.propTypes = {
  handleOnChange: PropTypes.func,
  input: PropTypes.object,
  states: PropTypes.array,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool
};

StateSelect.defaultProps = {
  handleOnChange: () => null,
  input: {},
  states: [],
  isFetchingStates: false,
  isShipping: true
};

export default memo(StateSelect);