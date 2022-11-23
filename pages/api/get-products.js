import {WC_GET_PRODUCTS_API_ROUTE} from '../../src/utils/constants/endpoints';

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3'
});

/**
 * Get products API.
 *
 * @param req
 * @param res
 */
export default async function handler(req, res) {
  const responseData = {
    success: false,
    error: null,
    products: []
  };
  const {perPage} = req?.query ?? {};

  try {
    const options = {
      per_page: perPage || 20
    };
    const {data} = await api.get(WC_GET_PRODUCTS_API_ROUTE, options);
    responseData.success = true;
    responseData.products = data;

    res.status(200).json(responseData);
  } catch (err) {
    responseData.success = false;
    responseData.error = err.message;
    res.status(500).json(responseData);
  }
}
