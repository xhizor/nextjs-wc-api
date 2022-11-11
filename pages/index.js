import axios from 'axios'

import Header from '../src/components/layout/header';
import Footer from '../src/components/layout/footer';
import {HEADER_FOOTER_ITEMS_URL} from '../src/utils/constants/endpoints';

/**
 * Index script.
 *
 * @returns {*}
 * @constructor
 */
export default function Home({data}) {
  const {header, footer} = data;

  return (
    <>
      <Header data={header}/>
      <main>
        Main
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
  const {data} = await axios.get(HEADER_FOOTER_ITEMS_URL);

  return {
    props: data || {},
    revalidate: 10
  }
}