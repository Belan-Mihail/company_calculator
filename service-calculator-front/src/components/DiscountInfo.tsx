import React, { useEffect, useState } from 'react'
import '../styles/DiscountInfo.css'

interface DiscountInfoProps {
    total: number
}

const DiscountInfo: React.FC<DiscountInfoProps> = ({ total }) => {
    
    const [discountMessage, setDiscountMessage] = useState<string>('');
    const [nextDiscountMessage, setNextDiscountMessage] = useState<string>('');
    const [currentDiscount, setCurrentDiscount] = useState<number>(0)
    const [showEffect, setShowEffect] = useState(false)

    useEffect(() => {

        let discount:number = 0
        let nextDiscountAmount = 0 
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
            setNextDiscountMessage('Maximum discount reached!');
        } else if (discount === 7) {
            setDiscountMessage('You get 7% discount!')
            nextDiscountAmount = 1500 - total;
            setNextDiscountMessage(`Order $${nextDiscountAmount.toFixed(2)} more to get 10% discount.`);
            
        } else if (discount === 5) {
            setDiscountMessage('You get 5% discount!')
            nextDiscountAmount = 1000 - total;
            setNextDiscountMessage(`Order $${nextDiscountAmount.toFixed(2)} more to get 7% discount.`);
        } else {
            setDiscountMessage('Discount not available. Order more to get a discount')
            nextDiscountAmount = 500 - total;
            setNextDiscountMessage(`Order $${nextDiscountAmount.toFixed(2)} more to get 5% discount.`);
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
    <div className='relative mb-8 p-4 rounded-xl bg-[#414a62] text-center flex flex-col gap-4'>
        <div className='text-[#80d6b9]'>
            <h2 className='text-[#fe8924]'>Discount Terms</h2>
            <p>10% discount on orders over $1,500</p>
            <p>7% discount on orders over $1,000</p>
            <p>5% discount on orders over $500</p>
        </div>
        
        
        <p className={`text-xl text-[#ffea62] ${showEffect ? 'glow-on-hover' : ''}`}>
            Current discount: {discountMessage}
        </p>
        {nextDiscountMessage && (
                <p className="text-[#80d6b9] mt-4">{nextDiscountMessage}</p>
            )}
    </div>
  )
}

export default DiscountInfo



