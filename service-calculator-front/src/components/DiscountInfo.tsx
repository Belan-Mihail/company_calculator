import React, { useEffect, useState } from 'react'
import { Discount } from '../types/Discount';



interface DiscountInfoProps {
    total: number
    discounts: Discount[]

}


const DiscountInfo: React.FC<DiscountInfoProps> = ({ total, discounts }) => {
    
    
    const [nextDiscountMessage, setNextDiscountMessage] = useState<string>('');
    const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null)
    


    useEffect(() => {
        let applicableDiscount = null

        // Look for necessary discount
        for (const disc of discounts) {
            if (total >= disc.available_from) {
                if (!applicableDiscount || disc.discount_size > applicableDiscount.discount_size) {
                    applicableDiscount = disc
                }
            }
        }

        setCurrentDiscount(applicableDiscount!)

        // next discount message
        let nextDiscountAmount = 0
        if (applicableDiscount) {
            const nextThreshold = discounts.find(disc => disc.available_from > total)
            if (nextThreshold) {
                nextDiscountAmount = nextThreshold.available_from - total 
                setNextDiscountMessage(`Order ${nextDiscountAmount.toFixed(2)} more to get ${nextThreshold.discount_size}% discount`)
            } else {
                setNextDiscountMessage('You have reached the maximum discount')
            }
        }

    })

  return (
    <div className='relative mb-2 p-2 rounded-xl text-center flex flex-col gap-2 text-base'>
        <div>
            <h2 className='text-xl font-semibold'>Discount Terms</h2>
            {discounts.map((disc, index) => (
                <p key={index}>{disc.discount_size}% discount on orders over {disc.discount_size}</p>
            ))}
        </div>
        
        
        <p className={`text-base font-semibold`}>
            {currentDiscount ? `You get ${currentDiscount.discount_size} discount!` : `Discount not available. Order more to get a discount`}
        </p>
        {nextDiscountMessage && (
                <p className="text-[#f74200] mt-2">{nextDiscountMessage}</p>
            )}
    </div>
  )
}

export default DiscountInfo



