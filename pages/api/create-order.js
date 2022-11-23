import {WC_CREATE_ORDER_API_ROUTE} from '../../src/utils/constants/endpoints';

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3'
});

/**
 * Create an order API.
 *  @see http://woocommerce.github.io/woocommerce-rest-api-docs/?javascript#create-an-order
 *
 * @param req
 * @param res
 * @returns {Promise<{total: string, orderId: string, success: boolean, currency: string, error: string}>}
 */
export default async function handler(req, res) {
  const responseData = {
    success: false,
    orderId: '',
    total: '',
    currency: '',
    error: '',
    paymentUrl: ''
  };

  if (!req.body) {
    responseData.error = 'Required data is not sent';
    return responseData;
  }

  const data = req.body;
  data.status = 'pending';
  data.set_paid = false;

  try {
    const {data} = await api.post(
      WC_CREATE_ORDER_API_ROUTE,
      req.body
    );
    responseData.success = true;
    responseData.orderId = data.number;
    responseData.total = data.total;
    responseData.paymentUrl = data.payment_url;

    res.status(200).json(responseData);
  } catch (err) {
    console.log('err', err);
    responseData.error = error.message;

    res.status(500).json(responseData);
  }
}