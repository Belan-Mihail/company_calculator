import React from "react";
import { ProductItemProps } from "../types/Product";
import '../styles/ProductItem.css'

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onQuantityChange,
  onRemove,
  rowId,
}) => {
  const { id, name, price, quantity, quantityInStock } = product;
  return (
    <div className="flex items-center space-x-4">
      <input
        type="range"
        min="1"
        max={quantityInStock}
        value={quantity}
        onChange={(e) => onQuantityChange(id, Number(e.target.value))}
      />
      <span>Quantity: {quantity}</span>
      <span>Price: {price}</span>
      <span>Total: {(quantity * price).toFixed(2)}</span>
      <button className="main-button" onClick={() => onRemove(id, rowId)}>X</button>
    </div>
  );
};

export default ProductItem;
