export type Discount = {
    discount_size: number
    available_from: number
}

export const discounts:Discount[] = [
    {discount_size: 5, available_from: 500 },
    {discount_size: 7, available_from: 1000 },
    {discount_size: 10, available_from: 1500 }
]