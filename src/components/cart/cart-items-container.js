import React, {useContext, useState} from 'react';
import Link from 'next/link';
import CartItem from './cart-item';
import {clearCart} from '../../utils/cart';
import {AppContext} from '../../context';

/**
 * Cart items container component.
 *
 * @returns {*}
 * @constructor
 */
const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);
  const [isClearCartProcessing, setClearCartProcessing] = useState(false);
  const {cartItems, totalPrice, totalQuantity} = cart || {};

  /**
   * Clear the cart handler.
   *
   * @param e
   * @returns {Promise<void>}
   */
  const onClearCart = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to clear the cart items?')) return;
    if (isClearCartProcessing) return;

    await clearCart(setCart, setClearCartProcessing);
  };

  return (
    <>
      {cart ? (
        <div className="grid lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 mb-md-0 mb-5">
            {
              cartItems?.length &&
              cartItems.map((item) => (
                <CartItem
                  key={item.product_id}
                  item={item}
                  products={cartItems}
                  setCart={setCart}
                />
              ))
            }
          </div>

          <div className="lg:col-span-1 p-5 pt-0">
            <h2 className="uppercase font-semibold mb-2">Cart total</h2>
            <div className="flex grid grid-cols-3 bg-gray-100 mb-4">
              <p className="col-span-2 p-2 mb-0">Total ({totalQuantity})</p>
              <p
                className="col-span-1 p-2 mb-0">{totalPrice} {cartItems?.[0]?.currency ?? ''}</p>
            </div>

            <div className="flex justify-between">
              <div>
                <button
                  className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-800"
                  onClick={(e) => onClearCart(e)}
                  disabled={isClearCartProcessing}>
                  <span>{!isClearCartProcessing ? "Clear cart" : "Clearing..."}</span>
                </button>
              </div>
              <Link href="/checkout">
                <button
                  className="text-white duration-500 bg-brand-orange hover:bg-brand-royal-blue focus:ring-4 focus:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900">
                  <span>Proceed to Checkout</span>
                  <i className="fas fa-long-arrow-alt-right"/>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="font-semibold mb-2">No items in the cart!</h2>
          <Link href="/" className="text-white duration-500 bg-brand-orange
            hover:bg-brand-royal-blue font-medium rounded-lg text-sm px-5 py-2.5
            text-center mr-2 mb-2 dark:focus:ring-yellow-900">
            <span>Add new products</span>
            <i className="fas fa-long-arrow-alt-right"/>
          </Link>
        </div>
      )}
    </>
  );
};

export default CartItemsContainer;