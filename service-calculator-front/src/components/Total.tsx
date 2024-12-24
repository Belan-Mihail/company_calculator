import React from 'react'

interface TotalProps {
  total: number
  totalWithDiscount: number
  savings: number
  deliveryCost: number
  finalTotal: number
}

const Total:React.FC<TotalProps> = ({total, totalWithDiscount, savings, deliveryCost, finalTotal}) => {
  return (
    <div className='mt-2 text-base'>
      {savings > 0 ? (
        <>
        <p>Price without discount: {total.toFixed(2)} USD</p>
        <p>Price after discount: {totalWithDiscount.toFixed(2)} USD</p>
        <p>You saved: {savings.toFixed(2)} USD</p>
        <p>Delivery Cost: {deliveryCost.toFixed(2)} USD</p>
        <p className="font-bold">Final Total: {finalTotal.toFixed(2)} USD</p>
        </>
      ) : (
        <>
        <p>Total price: {total.toFixed(2)} USD </p>
        
        {deliveryCost ? (<p>Delivery Cost: {deliveryCost.toFixed(2)} USD</p>) : ('')}
        
        
        <p className="font-bold">Final Total: {finalTotal.toFixed(2)} USD</p>
        </>
      )}
      
    </div>
  )
}

export default Total