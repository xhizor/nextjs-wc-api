class Product {
  /**
   *
   * @param wcProduct
   */
  constructor(wcProduct) {
    this.id = wcProduct.id;
    this.name = wcProduct?.name ?? '';
    this.description = wcProduct?.description ?? '';
    this.link = wcProduct?.permalink ?? '/';
    this.images = wcProduct?.images ?? [];
    this.price = wcProduct?.price_html ?? '';
    this.type = wcProduct?.type ?? '';
  }
}

export default Product;
