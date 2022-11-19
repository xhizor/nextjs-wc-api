import Image from '../image';
import PropTypes from 'prop-types';

/**
 * Checkout cart item component.
 *
 * @param item
 * @returns {*}
 * @constructor
 */
const CheckoutCartItem = ({item}) => {
  const productImg = item?.data?.images?.[0] ?? '';

  return (
    <tr>
      <td>
        <figure>
          <Image
            width={70}
            height={70}
            altText={productImg?.alt ?? ''}
            sourceUrl={productImg?.src || ''}
          />
        </figure>
      </td>
      <td>{item?.data?.name ?? ''} {item?.quantity > 1 ? `(x${item.quantity})` : ''}</td>
      <td>{item?.line_subtotal ?? ''} {item?.currency ?? ''}</td>
    </tr>
  )
};

CheckoutCartItem.propTypes = {
  item: PropTypes.object
};

export default CheckoutCartItem;