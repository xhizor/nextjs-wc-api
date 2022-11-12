import axios from 'axios'

import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import Products from '../src/components/products';
import {HEADER_FOOTER_ITEMS_URL} from '../src/utils/constants/endpoints';
import {getProducts} from '../src/data/products';

/**
 * Index script.
 *
 * @returns {*}
 * @constructor
 */
export default function Home({headerFooterData, products}) {
  const {header, footer} = headerFooterData;

  return (
    <>
      <Header data={header}/>
      <main className="container mx-auto py-4 overflow-hidden">
        <Products products={products}/>
      </main>
      <Footer data={footer}/>
    </>
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
    revalidate: 10
  }
}