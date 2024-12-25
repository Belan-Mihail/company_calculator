import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from './calculatorSlice';
import productReducer from './productReducer';

export const store = configureStore({
    reducer: {
        calculator: calculatorReducer,
        products: productReducer
    },
})