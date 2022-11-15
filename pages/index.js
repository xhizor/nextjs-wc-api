import axios from 'axios'

import Products from '../src/components/products';
import {HEADER_FOOTER_ITEMS_URL} from '../src/utils/constants/endpoints';
import {getProducts} from '../src/data/products';
import Layout from '../src/components/layout';

/**
 * Index script.
 *
 * @returns {*}
 * @constructor
 */
export default function Home({headerFooterData, products}) {
  return (
    <Layout headerFooterData={headerFooterData}>
      <Products products={products}/>
    </Layout>
  )
}

/**
 *
 * @returns {Promise<{revalidate: number, props: T | {}}>}
 */
export async function getStaticProps() {
  const {data: headerFooterData} = await axios.get(HEADER_FOOTER_ITEMS_URL);
  const {data: products} = await getProducts();

  return {
    props: {
      headerFooterData: headerFooterData?.data ?? {},
      products: products ?? {}
    },
    revalidate: 1
  }
}