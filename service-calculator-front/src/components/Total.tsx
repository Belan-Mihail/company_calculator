import React from 'react'

interface TotalProps {
  total: number
}

const Total:React.FC<TotalProps> = ({total}) => {
  return (
    <div className='mt-4'>
      Total price: {total.toFixed(2)} USD
    </div>
  )
}

export default Total