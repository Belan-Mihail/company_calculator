import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
    id: number,
    name: string,
    price: number,
    quantity: number
}

interface CalculatorState {
    items: Item[]
}

const initialState: CalculatorState = {
    items: []
}

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id != action.payload)
        },
        setQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
            const item = state.items.find(i => i.id === action.payload.id)
            if (item) {
                item.quantity = action.payload.quantity
            }
        }
    }
})