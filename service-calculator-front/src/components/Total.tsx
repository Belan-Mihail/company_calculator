import React from 'react'

interface TotalProps {
  total: number
  totalWithDiscount: number
  savings: number
}

const Total:React.FC<TotalProps> = ({total, totalWithDiscount, savings}) => {
  return (
    <div className='mt-4'>
      {savings > 0 ? (
        <>
        <p>Price without discount: {total.toFixed(2)} USD</p>
        <p>Price after discount: {totalWithDiscount.toFixed(2)} USD</p>
        <p>You saved: {savings.toFixed(2)} USD</p>
        </>
      ) : (
        <>
        <p>Total price: {total.toFixed(2)} USD </p>
        </>
      )}
      
    </div>
  )
}

export default Total