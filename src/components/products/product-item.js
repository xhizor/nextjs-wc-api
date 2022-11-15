import Link from 'next/link';
import Image from '../image';

import {sanitize} from '../../utils/functions';
import AddToCard from '../cart/add-to-cart';

/**
 * Product item component.
 *
 * @param product
 * @returns {*}
 * @constructor
 */
const ProductItem = ({product}) => {
  const {link, name, images, price, type} = product;
  const img = images?.[0] ?? {};

  return (
    <div
      className="my-2 px-2 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
      <Link href={link}>
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
      {type === 'simple' ? <AddToCard product={product}/> : null}
    </div>
  )
};

export default ProductItem;
