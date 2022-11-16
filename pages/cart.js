import axios from 'axios';

import {HEADER_FOOTER_ITEMS_URL} from '../src/utils/constants/endpoints';
import Layout from '../src/components/layout';
import CartItemsContainer from '../src/components/cart/cart-items-container';

/**
 * Cart page.
 *
 * @param headerFooter
 * @returns {*}
 * @constructor
 */
export default function Cart({headerFooterData}) {
  return (
    <Layout headerFooterData={headerFooterData}>
      <CartItemsContainer/>
    </Layout>
  );
};

/**
 *
 * @returns {Promise<{revalidate: number, props: {headerFooterData: *}}>}
 */
export async function getStaticProps() {
  const {data: headerFooterData} = await axios.get(HEADER_FOOTER_ITEMS_URL);

  return {
    props: {
      headerFooterData: headerFooterData?.data ?? {}
    },
    revalidate: 1
  };
}