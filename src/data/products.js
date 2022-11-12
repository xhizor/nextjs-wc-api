import {WC_GET_PRODUCTS_API_ROUTE} from '../../src/utils/constants/endpoints';

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: 'wc/v3'
});

/**
 * Gets the products.
 *
 * @param perPage
 * @returns {Promise<*>}
 */
export const getProducts = async (perPage) => {
  const options = {
    per_page: perPage || 20
  };
  return await api.get(WC_GET_PRODUCTS_API_ROUTE, options);
};