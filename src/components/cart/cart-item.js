import React, {useEffect, useState, useRef} from 'react';
import Image from '../image';
import {deleteCartItem, updateCart} from '../../utils/cart';
import Product from '../../models/Product';

/**
 * Cart item component.
 *
 * @param item
 * @param products
 * @param setCart
 * @returns {*}
 * @constructor
 */
const CartItem = ({item, products, setCart}) => {
  const [productCount, setProductCount] = useState(item.quantity);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [removingProduct, setRemovingProduct] = useState(false);
  const PRODUCT_QUANTITY_INCREMENT = 'increment';
  const PRODUCT_QUANTITY_DECREMENT = 'decrement';

  const product = new Product(item?.data);
  const productImg = product.images?.[0] ?? '';
  const totalPrice = item?.line_subtotal ?? '';
  const currency = item?.currency ?? '';
  const cartKey = item?.key ?? '';

  /**
   * Do not allow state update on an unmounted component.
   */
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
  }, []);

  /**
   * Remove the product handler.
   *
   * @param e
   * @param cartKey
   */
  const onRemoveProduct = (e, cartKey) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this product?')) return;
    if (!isMounted || updatingProduct) return;

    deleteCartItem(cartKey, setCart, setRemovingProduct);
  };

  /**
   * Product quantity change handler.
   *
   * @param e
   * @param cartKey
   * @param type
   */
  const onQuantityChange = (e, cartKey, type) => {
    if (!process.browser) return;
    e.stopPropagation();
    let newQuantity;
    let count = productCount;

    if (updatingProduct || removingProduct || (type === PRODUCT_QUANTITY_DECREMENT && productCount === 1)) {
      return;
    }

    if (type) {
      newQuantity = type === PRODUCT_QUANTITY_INCREMENT ? ++count : --count;
    } else {
      newQuantity = (e.target.value) ? parseInt(e.target.value) : 1;
    }

    setProductCount(newQuantity);
    if (!products.length) return;
    updateCart(cartKey, newQuantity, setCart, setUpdatingProduct);
  };

  return (
    <div
      className="grid grid-cols-3 gap-5 mb-5 border border-brand-bright-grey p-5">
      <div className="col-span-1">
        <figure>
          <Image
            width="300"
            height="300"
            altText={productImg?.alt ?? ''}
            sourceUrl={productImg?.src ?? ''}
          />
        </figure>
      </div>

      <div className="col-span-2">
        <div className="flex justify-between flex-col h-full">
          <div className="relative mb-5">
            <h3 className="text-brand-orange">
              {product.name}
            </h3>
            {product.description && <p>{product.description}</p>}
            <button
              className="absolute right-0 top-0 flex items-center text-xl"
              onClick={(e) => onRemoveProduct(e, cartKey)}
              title={`Delete product: ${product.name}`}>
              <span className="text-red-500">&times;</span>
            </button>
          </div>

          <footer
            className="flex justify-between py-4 border-t border-brand-bright-grey">
            <span>
              {totalPrice} {currency}
            </span>
            {updatingProduct &&
            <Image width={24} height={24} sourceUrl="/cart-spinner.gif"
                   altText="Spinner"/>}
            <div className="flex items-center">
              <button
                onClick={(e) => onQuantityChange(e, cartKey, PRODUCT_QUANTITY_DECREMENT)}>-
              </button>
              <input
                type="number"
                min="1"
                style={{width: '50px'}}
                data-cart-key={cartKey}
                className={`ml-3 text-center pr-0 ${updatingProduct ? 'disabled' : ''} `}
                value={productCount}
                onChange={(e) => onQuantityChange(e, cartKey, '')}
              />
              <button
                onClick={(e) => onQuantityChange(e, cartKey, PRODUCT_QUANTITY_INCREMENT)}>
                <span className="ml-2">+</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
};

export default CartItem;