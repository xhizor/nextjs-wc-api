import {addErrorData, getSanitizedData, isEmpty} from '../utils/functions';

/**
 * Validates the form data and get sanitized value.
 *
 * @param data
 * @param hasStates
 * @returns {{sanitizedData: {}, isValid: boolean, errors: {}}}
 */
export const validateAndGetSanitizedFormData = (data, hasStates = true) => {
  let errors = {};
  let sanitizedData = {};

  const FORM_DATA_VALIDATION_RULES = [
    {
      key: 'firstName',
      type: 'string',
      text: 'First name',
      min: 2,
      max: 35,
      required: true
    },
    {
      key: 'lastName',
      type: 'string',
      text: 'Last name',
      min: 2,
      max: 35,
      required: true
    },
    {
      key: 'company',
      type: 'string',
      text: 'Company name',
      min: 2,
      max: 35,
      required: false
    },
    {
      key: 'country',
      type: 'string',
      text: 'County name',
      min: 2,
      max: 55,
      required: true
    },
    {
      key: 'address1',
      type: 'string',
      text: 'Street address line 1',
      min: 5,
      max: 100,
      required: true
    },
    {
      key: 'address2',
      type: 'string',
      text: 'Street address line 2',
      min: 5,
      max: 100,
      required: false
    },
    {
      key: 'city',
      type: 'string',
      text: 'City',
      min: 3,
      max: 25,
      required: true
    },
    {
      key: 'state',
      type: 'string',
      text: 'State/County',
      min: 0,
      max: 254,
      required: hasStates
    },
    {
      key: 'postcode',
      type: 'string',
      text: 'Post code',
      min: 2,
      max: 10,
      required: true
    },
    {
      key: 'phone',
      type: 'phone',
      text: 'Phone number',
      min: 10,
      max: 15,
      required: true
    },
    {
      key: 'email',
      type: 'email',
      text: 'Email',
      min: 10,
      max: 254,
      required: true
    }
  ];

  FORM_DATA_VALIDATION_RULES.forEach(el => {
    const {key, text, min, max, type, required, noValidate} = el;

    data[key] = !isEmpty(data[key]) ? data[key] : '';
    const error = addErrorData(
      data[key],
      text,
      min,
      max,
      type,
      required
    );

    if (error) {
      errors[key] = error;
    } else {
      sanitizedData[key] = getSanitizedData(data[el.key], el.type);
    }
  });

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors)
  };
};