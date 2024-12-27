export type Product = {
    
    product_name: string,
    product_price: number,
    product_quantity: number,
    product_quantityInStock: number,
}

export const products: Product[] = [
    {id: 1, name: 'Product 1', price: 2.34, quantity: 0, quantityInStock: 350 },
    {id: 2, name: 'Product 2', price: 3.19, quantity: 0, quantityInStock: 250 },
    {id: 3, name: 'Product 3', price: 2.77, quantity: 0, quantityInStock: 150 },
    {id: 4, name: 'Product 4', price: 4.80, quantity: 0, quantityInStock: 40 },
  ]