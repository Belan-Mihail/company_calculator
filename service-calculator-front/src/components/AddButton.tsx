import React from "react";

interface AddButtonProps {
  isDisabled: boolean;
  onAddItem: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ isDisabled, onAddItem }) => {
  return (
    <button
      onClick={onAddItem}
      className={`main-button ${isDisabled ? "main-button-dis opacity-45 cursor-not-allowed" : ""}`}
      disabled={isDisabled}
      title={isDisabled ? "Please select a product first" : ""}
    >
      Add Product
    </button>
  );
};

export default AddButton;
