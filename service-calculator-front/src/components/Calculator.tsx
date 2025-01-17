import React, { useEffect, useState, useReducer } from 'react'
import { Product } from '../types/Product'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addItem, removeItem, resetCalculator, setQuantity } from '../redux/calculatorSlice'
import ProductItem from './ProductItem'
import AddButton from './AddButton'
import ResetButton from './ResetButton'
import Total from './Total'
import DiscountInfo from './DiscountInfo'
import { fetchFail, fetchRequest, fetchSuccess } from '../redux/productReducer'
import { Discount } from '../types/Discount'


const Calculator:React.FC = () => {
  
  const dispatch = useDispatch()
  // const products = useSelector((state: any) => state.products.products);
  const items = useSelector((state:any) => state.calculator.items)
  const [products, setProducts] = useState<Product[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([])
  

  // state for the rows of calculator, each row is an object with the field of the selected product
  const [rows, setRows] = useState<{id: number, selectedProduct: number | null}[]>([{id: 1, selectedProduct: null}])

  // fetch discount data
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/discounts')
        const data = await response.json()
        
        setDiscounts(data)
      } catch (error) {
        console.error('failed to fetch discounts', error)
      }
    }

    fetchDiscount()
  }, [])
  

  // fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      // dispatch(fetchRequest());  // 
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();

        // Convert data from the server into the format used in the frontend
        const transformedProducts = data.map((product: any, index: number) => ({
          id: index + 1,
          name: product.product_name,
          price: product.product_price,
          qunantity: product.product_quantity,
          quantityInStock: product.product_quantityInStock
        }))  

        // dispatch(fetchSuccess(transformedProducts));  // 
        setProducts(transformedProducts);
        
      } catch (error) {
        dispatch(fetchFail('Failed to fetch products'));  // 
      }
    };

    fetchProducts();
  }, []);


  


    // State for delivery options (checkboxes)
    const [deliveryOptions, setDeliveryOptions] = useState({
      noDelivery: true,
      hamburg: false,
      germany: false,
      eu: false,
    });

  // read the saved products from Localstorage
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('calculatorItem') || '[]')
    savedItems.forEach((item: any) => {
      dispatch(addItem(item))
    })
  }, [dispatch])

  // useEffect to save current data from items in localstorage 
  useEffect(() => {
    localStorage.setItem('calculatorItems', JSON.stringify(items))
  }) 

  // Function for adding a new row
  const addRow = () => {
    if (rows.length < products.length) { // Prevent adding more rows than available products
      setRows((prevRow) => {
        const newRowId = prevRow.length > 0 ? prevRow[prevRow.length - 1].id + 1 : 1
        const newRows = [...prevRow, {id: newRowId, selectedProduct: null}]
        return newRows
      })
    }
  }

  // Function for choosing a product in a row
  const handleProductSelect = (rowId: number, productId: number) => {
    
    const productToAdd = products.find((p) => p.id === productId);

    if (productToAdd) {
      const existingProduct = items.find((item) => item.id === productId);

      if (!existingProduct) {
        // If the product has not been added yet, add it with a quantity of 0
        
        dispatch(
          addItem({
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            quantity: 0, // initial quantity
            quantityInStock: productToAdd.quantityInStock,
          })
        );
      }
    }

    // Reset old quantity if product has changed
    const oldProductId = rows.find((row) => row.id === rowId)?.selectedProduct;
    if (oldProductId) {
      dispatch(setQuantity({ id: oldProductId, quantity: 0 })); // Reset quantity for old product
    }

    // Update the row with a new product
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, selectedProduct: productId } : row
      )
    );
  }

  // Function for handling changeing quantity
  const handleQuantityChange = (id: number, newQuantity: number) => {
    
   dispatch(setQuantity({id, quantity: newQuantity}))
  }

  const handleRemoveItem = (productId: number, rowId: number) => {
    // delete product from store
    
    dispatch(removeItem(productId))

    // delete priduct from rows
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((row) => row.id !== rowId)
      return updatedRows
    })

    // refresh localstorage
    const updateItems = items.filter((item) => item.id !== productId)
    localStorage.setItem('calculatorItems', JSON.stringify(updateItems))

    // add a new roe if no empty rows
    const emptyRowExist = rows.some((row) => row.selectedProduct === null)
    if (emptyRowExist) {
      addRow()
    }
  }

  // Function for reset calculator 
  const handleReset = () => {
    
    dispatch(resetCalculator())
    localStorage.removeItem('calculatorItems')
    setRows([{id: 1, selectedProduct: null}])

    // Reset delivery options (uncheck all checkboxes)
    setDeliveryOptions({
      noDelivery: true,
      hamburg: false,
      germany: false,
      eu: false
    })
  }


  const isAddButtonDisabled = rows.some((row) => row.selectedProduct === null) 
  const isResetButtonDisabled = rows.every((row) => row.selectedProduct === null)

  // Calculate the total amount to calculate the discount
  const calculateTotal = () => {
   
    const total = items.reduce((total, item) => total + item.price * item.quantity, 0)
    
    return total
  }

  // Calculate delivery cost
  const calculateDeliveryCost = (total: number) => {
    if (deliveryOptions.hamburg) {
      return total >= 50 ? 0 : 5;
    }
    if (deliveryOptions.germany) {
      return 30
    }
    if (deliveryOptions.eu) {
      return 50; // 
    }
    return 0;
  };

  const getDiscount = (total:number) => {
    if (discounts.length > 0) {
      for (const discount of discounts) {
        if (total >= discount.available_from) {
          return discount.discount_size
        }
      }
    }
    return 0  
  }

  const total = calculateTotal()
  const discount = getDiscount(total)
  const discountAmount = total * (discount / 100);
  const totalWithDiscount = total - discountAmount
  const savings = discountAmount

    // Calculate final total with delivery cost
    const deliveryCost = calculateDeliveryCost(totalWithDiscount);
    const finalTotal = totalWithDiscount + deliveryCost;
  
  
   // Handle delivery option changes
   const handleDeliveryOptionChange = (option: string) => {
    if (option === 'noDelivery') {
      setDeliveryOptions({
        noDelivery: true,
        hamburg: false,
        germany: false,
        eu: false,
      });
    } else {
      setDeliveryOptions((prevOptions) => {
        const resetOptions = {
          hamburg: false,
          germany: false,
          eu: false,
          noDelivery: false, // Ensure "No Delivery" is unchecked
        };
        resetOptions[option] = true;
        return resetOptions;
      });
    }
  };

  return (
    <div className="p-4 items-center justify-center text-center flex flex-col gap-2 w-auto w-max-full">
      <DiscountInfo total={total} discounts={discounts} />
      {rows.map((row) => {
        const availableProduct = products.filter(
          (product) => !rows.some((r) => r.selectedProduct === product.id) || row.selectedProduct === product.id
        );

        return (
          <div key={row.id} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center space-x-4 ">
              {/* Render select only if no product is selected for this row */}
              <select
                onChange={(e) => handleProductSelect(row.id, Number(e.target.value))}
                value={row.selectedProduct ?? ''}
                className="border p-2"
              >
                <option value="" disabled={row.selectedProduct !== null}>
                  {row.selectedProduct === null ? 'Select Product' : 'Product already selected'}
                </option>
                {availableProduct.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price} $
                  </option>
                ))}
              </select>

              {/* Render ProductItem if the product is selected */}
              {row.selectedProduct !== null && (
  <ProductItem
    product={items.find((item) => item.id === row.selectedProduct) || {}}
    onQuantityChange={handleQuantityChange}
    onRemove={handleRemoveItem}
    rowId={row.id}
  />
)}
            </div>
          </div>
        );
      })}

      {/* Delivery Options */}
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="text-xl font-semibold">Select Delivery Option</h3>
        <div className="grid grid-cols-2 gap-4">
        <label>
            <input
              type="checkbox"
              checked={deliveryOptions.noDelivery}
              onChange={() => handleDeliveryOptionChange('noDelivery')}
            />
            No Delivery
          </label>
          <label>
            <input
              type="checkbox"
              checked={deliveryOptions.hamburg}
              onChange={() => handleDeliveryOptionChange('hamburg')}
            />
            Hamburg (5$)
          </label>
          <label>
            <input
              type="checkbox"
              checked={deliveryOptions.germany}
              onChange={() => handleDeliveryOptionChange('germany')}
            />
            Germany (30$)
          </label>
          <label>
            <input
              type="checkbox"
              checked={deliveryOptions.eu}
              onChange={() => handleDeliveryOptionChange('eu')}
            />
            EU (50$)
          </label>
        </div>
      </div>

      <div className="flex items-center space-x-4 mt-2">
        {rows.length < products.length && (
          <AddButton isDisabled={rows.some((row) => row.selectedProduct === null)} onAddItem={addRow} />
        )}
        <ResetButton isDisabled={rows.every((row) => row.selectedProduct === null)} onReset={handleReset} />
      </div>
      <Total total={total} totalWithDiscount={totalWithDiscount} savings={savings} deliveryCost={deliveryCost} finalTotal={finalTotal} deliveryOptions={deliveryOptions} />
    </div>
  );
}

export default Calculator