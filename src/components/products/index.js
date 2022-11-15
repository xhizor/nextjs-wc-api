import Product from '../../models/Product';
import ProductItem from './product-item';

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
        productItems && productItems.map(product => (
          <ProductItem key={product?.id} product={product}/>
        ))
      }
    </div>
  );
};

export default Products;
