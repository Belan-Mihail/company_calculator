export type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    quantityInStock: number,
}

export interface ProductItemProps {
    product: Product,
    onQuantityChange: (id: number, quantity: number) => void,
    onRemove: (id: number, rowId: number) => void,
    rowId: number
}