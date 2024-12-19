import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface DiscountInfoProps {
    total: number
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({ total }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [discountMessage, setDiscountMessage] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('cream');

    useEffect(() => {
        if (total >= 1500) {
            setDiscountMessage('You get 10% discount!')
            setTextColor('green')
            setShowConfetti(true)
        } else if (total >= 1000) {
            setDiscountMessage('You get 7% discount!')
            setTextColor('green')
            setShowConfetti(true)
        } else if (total >= 500) {
            setDiscountMessage('You get 5% discount!')
            setTextColor('green')
            setShowConfetti(true)
        } else {
            setDiscountMessage('Order more to get a discount')
        }
    }, [total])

  return (
    <div className='relative mb-8 p-4 rounded bg-blue-700 text-center'>
        
        {showConfetti && <Confetti />}
        <p style={{ color: textColor}} className='text-xl'>
            {discountMessage}
        </p>
    </div>
  )
}

export default DiscountInfo