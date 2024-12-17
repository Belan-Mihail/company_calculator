import React from "react";
import { ProductItemProps } from "../types/Product";

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onQuantityChange,
  onRemove,
}) => {
  const { id, name, price, quantity, quantityInStock } = product;
  return (
    <div className="flex items-center space-x-4">
      <span>
        {name} {price}$
      </span>
      <input
        type="range"
        min="1"
        max={quantityInStock}
        value={quantity}
        onChange={(e) => onQuantityChange(id, Number(e.target.value))}
      />
    </div>
  );
};

export default ProductItem;
