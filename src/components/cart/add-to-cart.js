import Link from 'next/link';
import cx from 'classnames';

import {addToCart} from '../../utils/cart';
import {AppContext} from '../../context';
import {useContext, useState} from 'react';

/**
 * Adds the product to the WC cart.
 *
 * @param product
 * @returns {null|*}
 * @constructor
 */
const AddToCard = ({product}) => {
  const [cart, setCart] = useContext(AppContext);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addToCartBtnClasses = cx(
    'text-gray-800 font-semibold py-2 px-4 mt-3 border border-gray-400 rounded shadow', {
      'bg-white hover:bg-gray-100': !isLoading,
      'bg-gray-200': isLoading
    }
  );

  if (!product) return null;

  return (
    <>
      <button
        className={addToCartBtnClasses}
        onClick={() => addToCart(
          product?.id ?? 0,
          1,
          setCart,
          setIsAddedToCart,
          setIsLoading
        )}
        disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add to cart'}
      </button>
      {isAddedToCart && !isLoading ? (
        <Link href="/cart"
              className="text-gray-800 font-semibold py-2 px-4 mt-3 ml-3 py-9px border border-gray-400 rounded shadow bg-white hover:bg-gray-100">
          View cart
        </Link>
      ) : null}
    </>
  );
};

export default AddToCard;
