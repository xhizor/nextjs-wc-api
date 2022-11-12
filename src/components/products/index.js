import Link from 'next/link';

import Product from '../../models/Product';
import Image from '../image';
import {sanitize} from '../../utils/functions';

/**
 * Products component.
 *
 * @constructor
 */
const Products = ({products}) => {
  const productItems = products?.length
    ? products.map(product => new Product(product))
    : null;

  return (
    <div className="flex flex-wrap -mx-2 overflow-hidden">
      {
        productItems && productItems.map(({id, link, name, images, price}) => {
          const img = images?.[0] ?? {};

          return (
            <div key={id}
                 className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
              <Link href={link} className="flex flex-col items-center">
                <Image
                  sourceUrl={img?.src}
                  altText={img?.alt}
                  title={name}
                  width='380'
                  height='380'
                />
                <h3 className="font-medium">{name}</h3>
                <div dangerouslySetInnerHTML={{__html: sanitize(price)}}/>
              </Link>
            </div>
          )
        })
      }
    </div>
  );
};

export default Products;
