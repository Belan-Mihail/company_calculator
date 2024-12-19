import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti/dist/types/Confetti'

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
        }
    })

  return (
    <div>DiscountInfo</div>
  )
}

export default DiscountInfo