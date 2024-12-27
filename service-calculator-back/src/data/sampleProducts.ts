export type Product = {
    
    product_name: string,
    product_price: number,
    product_quantity: number,
    product_quantityInStock: number,
}

export const products: Product[] = [
    {product_name: 'Product 1', product_price: 3.34, product_quantity: 0, product_quantityInStock: 350 },
    {product_name: 'Product 2', product_price: 4.19, product_quantity: 0, product_quantityInStock: 250 },
    {product_name: 'Product 3', product_price: 3.77, product_quantity: 0, product_quantityInStock: 150 },
    {product_name: 'Product 4', product_price: 5.80, product_quantity: 0, product_quantityInStock: 40 },
  ]