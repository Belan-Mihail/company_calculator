import React from 'react'

interface TotalProps {
  total: number
  totalWithDiscount: number
  savings: number
  deliveryCost: number
  finalTotal: number
}



const Total:React.FC<TotalProps> = ({total, totalWithDiscount, savings, deliveryCost, finalTotal}) => {

  // Check if delivery cost is for Hamburg and total exceeds $50
  const isHamburgDelivery = deliveryCost === 5 && total >= 50;
  

  return (
    <div className='mt-2 text-base'>
      {savings > 0 ? (
        <>
        <p>Price without discount: {total.toFixed(2)} USD</p>
        <p>Price after discount: {totalWithDiscount.toFixed(2)} USD</p>
        <p>You saved: {savings.toFixed(2)} USD</p>
        {deliveryCost ? (<p>Delivery Cost: {deliveryCost.toFixed(2)} USD</p>) : ('')}
        {isHamburgDelivery && (
            <p>
              Free delivery in Hamburg for orders over $50!
            </p>
          )}
        <p className="font-bold">Final Total: {finalTotal.toFixed(2)} USD</p>
        </>
      ) : (
        <>
          {total.toFixed(2) !== finalTotal.toFixed(2) ? (
            <>
            <p>Total price: {total.toFixed(2)} USD </p>
            {deliveryCost ? (<p>Delivery Cost: {deliveryCost.toFixed(2)} USD</p>) : ('')}
            {isHamburgDelivery && (
            <p>
              Free delivery in Hamburg for orders over $50!
            </p>
          )}
            <p className="font-bold">Final Total: {finalTotal.toFixed(2)} USD</p>
            </>
          ) : (
            <>
            <p>Total price: {total.toFixed(2)} USD </p>
            {deliveryCost ? (<p>Delivery Cost: {deliveryCost.toFixed(2)} USD</p>) : ('')}
            {isHamburgDelivery && (
            <p>
              Free delivery in Hamburg for orders over $50!
            </p>
          )}
            </>
          )}        
        </>
      )}
      
    </div>
  )
}

export default Total