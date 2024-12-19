import React, { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addItem, removeItem, resetCalculator, setQuantity } from '../redux/calculatorSlice'
import ProductItem from './ProductItem'
import AddButton from './AddButton'
import ResetButton from './ResetButton'
import Total from './Total'
import DiscountInfo from './DiscountInfo'

const products: Product[] = [
  {id: 1, name: 'Product 1', price: 2.34, quantity: 0, quantityInStock: 350 },
  {id: 2, name: 'Product 2', price: 3.19, quantity: 0, quantityInStock: 250 },
  {id: 3, name: 'Product 3', price: 2.77, quantity: 0, quantityInStock: 150 },
  {id: 4, name: 'Product 4', price: 4.80, quantity: 0, quantityInStock: 40 },
]

const Calculator:React.FC = () => {
  const dispatch = useDispatch()
  const items = useSelector((state:any) => state.calculator.items)

  // state for the rows of calculator, each row is an object with the field of the selected product
  const [rows, setRows] = useState<{id: number, selectedProduct: number | null}[]>([{id: 1, selectedProduct: null}])

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
    // Find the selected product in the products array
    const productToAdd = products.find((p) => p.id === productId)

    if (productToAdd) {
      // check selected product in items array
      const existingProduct = items.find((item) => item.id === productId)

      // Add the product to (Redux) if it is not there yet
      if (!existingProduct) {
        dispatch(addItem({
          id: productToAdd.id,
          name: productToAdd.name,
          price: productToAdd.price,
          quantity: productToAdd.quantity,
          quantityInStock: productToAdd.quantityInStock
        }))
      }
    }

    

    setRows((prevRows) => 
      prevRows.map((row) => (
        row.id === rowId ? {...row, selectedProduct: productId} : row
      ))
    )
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
  }

  // Function to calculate total
  const caulculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const isAddButtonDisabled = rows.some((row) => row.selectedProduct === null) 
  const isResetButtonDisabled = rows.every((row) => row.selectedProduct === null)

  // Calculate the total amount to calculate the discount
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const total = calculateTotal()

  return (
    <div className='p-8'>
      <DiscountInfo total={total} />
      {rows.map((row) => {
        const availableProduct = products.filter((product) => !rows.some((row) => row.selectedProduct === product.id))
        return (
          <div key={row.id} className='space-y-4'>
            {row.selectedProduct === null ? (
              <div>
               <select
                onChange={(e) => handleProductSelect(row.id, Number(e.target.value))}
                value={row.selectedProduct ?? ''}
                className='border p-2'
                > 
                <option value="" disabled>Select Product</option>
                {availableProduct.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - {product.price} $
                  </option>
                ))}
                </select>
                
              </div>
            ) : (
              <ProductItem 
              product={items.find((item) => item.id === row.selectedProduct)!}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
              rowId={row.id}
              />
            )}
          </div>
        )
      })}
      <div className='flex items-center space-x-4'>
        {rows.length < products.length ? (<AddButton isDisabled={isAddButtonDisabled} onAddItem={addRow} />) : ('')}
        
        <ResetButton isDisabled={isResetButtonDisabled} onReset={handleReset} />
      </div>
      <Total total={caulculateTotal()} />
    </div>
  )
}

export default Calculator