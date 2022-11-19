import CheckoutCartItem from './checkout-cart-item';

/**
 * Order details component.
 *
 * @param cart
 * @returns {*}
 * @constructor
 */
const OrderDetails = ({cart}) => {
  return (
    <>
      {cart ?
        <>
          <table className="table table-hover w-full mb-10 border-separate"
                 style={{borderSpacing: '0 7px'}}>
            <thead>
            <tr className="text-left">
              <th/>
              <th>Product</th>
              <th>Total</th>
            </tr>
            </thead>
            <tbody>
            {cart?.cartItems?.length && (
              cart.cartItems.map((item, index) => (
                <CheckoutCartItem key={item?.productId ?? index}
                                  item={item}/>
              ))
            )}
            <tr className="bg-gray-100">
              <td/>
              <td className="text-xl uppercase">Total</td>
              <td className="text-xl">
                {cart?.totalPrice} {cart?.cartItems?.[0]?.currency ?? ''}
              </td>
            </tr>
            </tbody>
          </table>
        </>
        : null
      }
    </>
  )
};

export default OrderDetails;