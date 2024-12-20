import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import '../styles/DiscountInfo.css'

interface DiscountInfoProps {
    total: number
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({ total }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [discountMessage, setDiscountMessage] = useState<string>('');
    const [textColor, setTextColor] = useState<string>('cream');
    const [currentDiscount, setCurrentDiscount] = useState<number>(0)
    const [showEffect, setShowEffect] = useState(false)

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
            if (discount > currentDiscount) {
                setShowEffect(true)
            }
            setCurrentDiscount(discount)
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

        // Hide  after 5 seconds
        if (showEffect) {
            const timer = setTimeout(() => {
                setShowEffect(false)
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [total, showEffect, currentDiscount])

  return (
    <div className='relative mb-8 p-4 rounded bg-blue-700 text-center'>
        <h2>Discount Terms</h2>
        <p>10% discount on orders over $1,500</p>
        <p>7% discount on orders over $1,000</p>
        <p>5% discount on orders over $500</p>
        
        <p style={{ color: textColor}} className={`text-xl ${showEffect ? 'glow-on-hover' : ''}`}>
            Current discount: {discountMessage}
        </p>
    </div>
  )
}

export default DiscountInfo