import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'

interface DiscountInfoProps {
    total: number
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({ total }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [discountMessage, setDiscountMessage] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('cream');
    const [currentDiscount, setCurrentDiscount] = useState<number>(0)

    useEffect(() => {

        let discount:number = 0
        if (total >= 1500) {
            discount = 10
        } else if (total >= 1000) {
            discount = 7
        } else if (total >= 500) {
            discount = 5
        }

        if (discount !== currentDiscount) {
            setCurrentDiscount(discount)
            setShowConfetti(true)
        }


        if (discount === 10) {
            setDiscountMessage('You get 10% discount!')
            setTextColor('green')
        } else if (discount === 7) {
            setDiscountMessage('You get 7% discount!')
            setTextColor('green')
        } else if (discount === 5) {
            setDiscountMessage('You get 5% discount!')
            setTextColor('green')
        } else {
            setDiscountMessage('Discount not available. Order more to get a discount')
            setTextColor('cream')
        }

        // Hide confetti after 2 seconds
        if (showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false)
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [total, showConfetti, currentDiscount])

  return (
    <div className='relative mb-8 p-4 rounded bg-blue-700 text-center'>
        <h2>Discount Terms</h2>
        <p>10% discount on orders over $1,500</p>
        <p>7% discount on orders over $1,000</p>
        <p>5% discount on orders over $500</p>
        {showConfetti && 
            <div style={{transition: 'opacity 2s easy-out', opacity: showConfetti ? 1 : 0}}>
                <Confetti />
            </div>
        }
        <p style={{ color: textColor}} className='text-xl'>
            Current discount: {discountMessage}
        </p>
    </div>
  )
}

export default DiscountInfo