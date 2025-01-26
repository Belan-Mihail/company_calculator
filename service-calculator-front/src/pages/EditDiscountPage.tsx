import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Discount } from "../types/Discount";
import { toast, ToastContainer } from "react-toastify";
import ReturnToMainButton from "../components/ReturnToMainButton";

interface ValidationErrors {
  discountSizeError: string | null;
  discountAvailableFromError: string | null;
}

const EditDiscountPage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const discountId = useParams<{ discountId: string }>().discountId;
  console.log(discountId)

  // state to manage Discount from data
  const [discountData, setDiscountData] = useState<Discount>({
    discount_size: 0,
    available_from: 0,
  });

  // state to manage initial discount data
  const [initialDiscount, setInitialDiscount] = useState<Discount>({
    discount_size: 0,
    available_from: 0,
  });

  // state to manage validation error messages
  const [validationError, setValidationErrors] = useState<ValidationErrors>({
    discountSizeError: null,
    discountAvailableFromError: null,
  });

  // state to track if any field is changed
  const [isFieldsChanged, setIsFieldsChanged] = useState(false);

  // Fetch discount details on component mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDiscount = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/discounts/${discountId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setDiscountData({
            discount_size: data.discount_size,
            available_from: data.available_from,
          });
          setInitialDiscount({
            discount_size: data.discount_size,
            available_from: data.available_from,
          });
        } else {
          toast.error(data.message || "Error fetching discount");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };

    if (discountId) {
      fetchDiscount();
    }
  }, [token, discountId, navigate]);

  // function to validate form fields
  const validateFields = () => {
    let isValid = true;
    const NewValidationError: any = {
      discountSizeError: null,
      discountAvailableFromError: null,
    };

    if (isNaN(discountData.discount_size) || discountData.discount_size < 0) {
      NewValidationError.discountSizeError =
        "Discount size must be a valid number greater than 0.";
      isValid = false;
    }

    if (isNaN(discountData.available_from) || discountData.available_from < 0) {
      NewValidationError.discountAvailableFromError =
        "Discount available from amoung must be a valid number greater than 0.";
      isValid = false;
    }

    setValidationErrors(NewValidationError);
    return isValid;
  };

  // submit form function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // viladate form fields
    if (!validateFields()) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/discounts/${discountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            discount_size: discountData.discount_size,
            available_from: discountData.available_from,
          }),
        }
      );

      if (response.ok) {
        toast.success("Discount updated successfully!");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update discount");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Handler for changes in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDiscountData((prevData) => {
      const newDiscountData = {
        ...prevData,
        [name]: value,
      };

      // Check if any field has changed
      setIsFieldsChanged(
        JSON.stringify(newDiscountData) !== JSON.stringify(initialDiscount)
      );
      return newDiscountData;
    });
  };

  // Handler for Cancel button Click
  const handleCancel = () => {
    setDiscountData(initialDiscount);
    setIsFieldsChanged(false)
  };

  return (
    <div className="flex flex-col items-center  justify-center m-8 p-4 gap-2 rounded-lg main mx-auto mt-10 w-max">
      <h2 className="text-xl font-bold">Edit Discount</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="discountSize" className="block text-sm font-semibold">
            Discount Size
          </label>
          <input
            type="text"
            id="discountSize"
            name="name"
            value={discountData.discount_size}
            onChange={handleChange}
            placeholder="Enter discount size"
          />
          {validationError.discountSizeError && (
                        <p className="text-red-500 text-xs">{validationError.discountSizeError}</p>
                    )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="discountAvailable"
            className="block text-sm font-semibold"
          >
            Discount Available From
          </label>
          <input
            type="text"
            id="discountAvailable"
            name="name"
            value={discountData.available_from}
            onChange={handleChange}
            placeholder="Enter amount"
          />
          {validationError.discountAvailableFromError && (
                        <p className="text-red-500 text-xs">{validationError.discountAvailableFromError}</p>
                    )}
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <button
            type="submit"
            className={`main-button ${
              !isFieldsChanged
                ? "main-button-dis opacity-45 cursor-not-allowed"
                : ""
            }`}
            disabled={!isFieldsChanged}
          >
            Edit Product
          </button>
          <button
            type="button"
            className={`main-button ${
              !isFieldsChanged
                ? "main-button-dis opacity-45 cursor-not-allowed"
                : ""
            }`}
            onClick={handleCancel}
            disabled={!isFieldsChanged}
          >
            Cancel
          </button>
          <ReturnToMainButton />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditDiscountPage;
