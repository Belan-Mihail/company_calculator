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
    
    <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 gap-2 sm:gap-0 items-center w-[500px]  justify-around  " style={{flex: 1}}>
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
      <button className="main-button mb-2 sm:mb-0" onClick={() => onRemove(id, rowId)}>X</button>
      
    </div>
  );
};

export default ProductItem;
