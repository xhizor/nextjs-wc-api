import PropTypes from 'prop-types';

import Input from './form/input';
import CountrySelect from './form/country-select';
import StateSelect from './form/state-select';

/**
 * User address component.
 *
 * @param input
 * @param countries
 * @param states
 * @param onChange
 * @param isFetchingStates
 * @param isShipping
 * @returns {*}
 * @constructor
 */
const UserInfo = ({input, countries, states, onChange, isFetchingStates, isShipping}) => {
  const {errors} = input || {};

  return (
    <>
      <div className="flex flex-wrap overflow-hidden sm:-mx-2">
        <Input name="firstName"
               value={input?.firstName}
               required
               handleOnChange={onChange}
               label="First name"
               errors={errors}
               isShipping={isShipping}
               containerClasses="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
        <Input name="lastName"
               value={input?.lastName}
               required
               handleOnChange={onChange}
               label="Last name"
               errors={errors}
               isShipping={isShipping}
               containerClasses="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
      </div>
      <Input
        name="company"
        value={input?.company}
        handleOnChange={onChange}
        label="Company name"
        errors={errors}
        isShipping={isShipping}
        containerClasses="mb-4"
      />
      <CountrySelect
        input={input}
        handleOnChange={onChange}
        countries={countries}
        isShipping={isShipping}
      />
      <Input
        name="address1"
        value={input?.address1}
        required
        handleOnChange={onChange}
        label="Street address"
        placeholder="House number and street name"
        errors={errors}
        isShipping={isShipping}
        containerClasses="mb-4"
      />
      <Input
        name="address2"
        value={input?.address2}
        handleOnChange={onChange}
        label="Street address line two"
        placeholder="Apartment floor unit building floor etc (optional)"
        errors={errors}
        isShipping={isShipping}
        containerClasses="mb-4"
      />
      <Input
        name="city"
        value={input?.city}
        required
        handleOnChange={onChange}
        label="City"
        errors={errors}
        isShipping={isShipping}
        containerClasses="mb-4"
      />
      <StateSelect
        input={input}
        handleOnChange={onChange}
        states={states}
        isShipping={isShipping}
        isFetchingStates={isFetchingStates}
      />
      <div className="flex flex-wrap overflow-hidden sm:-mx-2">
        <Input
          name="postcode"
          value={input?.postcode}
          required
          handleOnChange={onChange}
          label="Post code"
          errors={errors}
          isShipping={isShipping}
          containerClasses="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
        <Input
          name="phone"
          value={input?.phone}
          required
          handleOnChange={onChange}
          label="Phone"
          errors={errors}
          isShipping={isShipping}
          containerClasses="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
        />
      </div>
      <Input
        name="email"
        type="email"
        value={input?.email}
        required
        handleOnChange={onChange}
        label="Email"
        errors={errors}
        isShipping={isShipping}
        containerClasses="mb-4"
      />
    </>
  );
};

UserInfo.propTypes = {
  input: PropTypes.object,
  countries: PropTypes.array,
  onChange: PropTypes.func,
  isFetchingStates: PropTypes.bool,
  isShipping: PropTypes.bool
};

UserInfo.defaultProps = {
  input: {},
  countries: [],
  onChange: () => null,
  isFetchingStates: false,
  isShipping: false
};

export default UserInfo;