export const productToAPIFormat = (product: Product): APIProduct => ({
  id: product.id,
  name: product.name,
  price: product.price,
  quantity: product.quantity,
  picture: product.picture,
});
