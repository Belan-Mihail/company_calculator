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