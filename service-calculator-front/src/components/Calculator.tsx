import React, { useEffect, useState } from 'react'
import { Product } from '../types/Product'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addItem } from '../redux/calculatorSlice'

const products: Product[] = [
  {id: 1, name: 'Product 1', price: 2.34, quantity: 0, quantityInStock: 350 },
  {id: 1, name: 'Product 2', price: 3.19, quantity: 0, quantityInStock: 250 },
  {id: 1, name: 'Product 3', price: 2.77, quantity: 0, quantityInStock: 150 },
  {id: 1, name: 'Product 4', price: 4.80, quantity: 0, quantityInStock: 40 },
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
    setRows((prevRows) => 
      prevRows.map((row) => (
        row.id === rowId ? {...row, selectedProduct: productId} : row
      ))
    )
  }


  return (
    <div>Calculator</div>
  )
}

export default Calculator