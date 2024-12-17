import React from 'react'
import { ProductItemProps } from '../types/Product'

const ProductItem:React.FC<ProductItemProps> = ({product, onQuantityChange, onRemove}) => {
  const {id, name, price, quantity, quantityInStock} = product
  return (
    <div>ProductItem</div>
  )
}

export default ProductItem