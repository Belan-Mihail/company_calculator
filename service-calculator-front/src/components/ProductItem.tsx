import React from "react";
import { ProductItemProps } from "../types/Product";

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onQuantityChange,
  onRemove,
  rowId,
}) => {
  const { id, name, price, quantity, quantityInStock } = product;
  return (
    <div className="flex items-center space-x-4">
      <span>
        {name}$
      </span>
      <input
        type="range"
        min="1"
        max={quantityInStock}
        value={quantity}
        onChange={(e) => onQuantityChange(id, Number(e.target.value))}
      />
      <span>Quantity: {quantity}</span>
      <span>Price: {price}</span>
      <span>Total: {quantity * price}</span>
      <button className="bg-red-500" onClick={() => onRemove(id, rowId)}>Remove product</button>
    </div>
  );
};

export default ProductItem;
