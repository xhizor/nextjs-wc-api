import axios from 'axios';
import React from 'react';

import Layout from '../src/components/layout';
import {
  HEADER_FOOTER_ITEMS_URL,
  WC_COUNTRIES_URL
} from '../src/utils/constants/endpoints';
import CheckoutForm from '../src/components/checkout/checkout-form';

/**
 * Checkout page.
 *
 * @param headerFooterData
 * @param countries
 * @returns {*}
 * @constructor
 */
export default function Checkout({headerFooterData, countries}) {
  return (
    <Layout headerFooterData={headerFooterData}>
      <CheckoutForm countries={countries}/>
    </Layout>
  )
}

/**
 *
 * @returns {Promise<{revalidate: number, props: {headerFooterData: *}}>}
 */
export async function getStaticProps() {
  const {data: headerFooterData} = await axios.get(HEADER_FOOTER_ITEMS_URL);
  const {data: countries} = await axios.get(WC_COUNTRIES_URL);

  return {
    props: {
      headerFooterData: headerFooterData?.data ?? {},
      countries: countries ?? {}
    },
    revalidate: 1
  };
}