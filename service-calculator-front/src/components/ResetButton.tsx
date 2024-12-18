import React from "react";
interface ResetButtonProps {
  isDisabled: boolean;
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset, isDisabled }) => {
  return (
    <button
      className={`bg-red-500 ${
        isDisabled ? "opacity-45 cursor-not-allowed" : ""
      }`}
      onClick={onReset}
      disabled={isDisabled}
      title={isDisabled ? 'No products selected' : ''}
    >
      Reset
    </button>
  );
};

export default ResetButton;
