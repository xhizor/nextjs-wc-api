/**
 * Gets the formatted order data.
 *
 * @param order
 * @param products
 * @return {{shipping: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}, payment_method_title: string, line_items: (*[]|*), payment_method: string, billing: {country: *, city: *, phone: *, address_1: (string|*), address_2: (string|*), postcode: (string|*), last_name: (string|*), company: *, state: *, first_name: (string|*), email: *}}}
 */
export const getCreateOrderData = (order, products) => {
  const billingData = order.billingDifferentThanShipping ? order.billing : order.shipping;

  return {
    shipping: {
      first_name: order?.shipping?.firstName,
      last_name: order?.shipping?.lastName,
      address_1: order?.shipping?.address1,
      address_2: order?.shipping?.address2,
      city: order?.shipping?.city,
      country: order?.shipping?.country,
      state: order?.shipping?.state,
      postcode: order?.shipping?.postcode,
      email: order?.shipping?.email,
      phone: order?.shipping?.phone,
      company: order?.shipping?.company,
    },
    billing: {
      first_name: billingData?.firstName,
      last_name: billingData?.lastName,
      address_1: billingData?.address1,
      address_2: billingData?.address2,
      city: billingData?.city,
      country: billingData?.country,
      state: billingData?.state,
      postcode: billingData?.postcode,
      email: billingData?.email,
      phone: billingData?.phone,
      company: billingData?.company,
    },
    payment_method: order?.paymentMethod,
    payment_method_title: order?.paymentMethod,
    line_items: getCreateOrderLineItems(products),
  };
};

/**
 * Gets the line items for an order.
 *
 * @param {array} products
 *
 * @returns {*[]|*}.
 */
export const getCreateOrderLineItems = (products) => {
  if (!products?.length) {
    return [];
  }

  return products.map(({product_id, quantity}) => {
      return {
        quantity,
        product_id
      };
    }
  );
};

/**
 * Creates an order.
 *
 * @param {Object} orderData
 * @param {function} setOrderFailedError
 * @param {string} previousRequestError
 *
 * @returns {Promise<{orderId: null, error: string}>}
 */
export const createOrder = async (orderData, setOrderFailedError, previousRequestError) => {
  const CREATE_ORDER_API_URL = '/api/create-order';
  let response = {
    orderId: null,
    total: '',
    currency: '',
    error: ''
  };

  if (previousRequestError) {
    response.error = previousRequestError;
    return response;
  }

  setOrderFailedError('');

  try {
    const request = await fetch(CREATE_ORDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await request.json();
    if (result.error) {
      response.error = result.error;
      setOrderFailedError('Order creation failed. Please try again');
    }

    response.orderId = result?.orderId ?? '';
    response.total = result.total ?? '';
    response.currency = result.currency ?? '';
    response.paymentUrl = result.paymentUrl ?? '';
  } catch (err) {
    console.error('Create order error', err?.message);
  }

  return response;
};