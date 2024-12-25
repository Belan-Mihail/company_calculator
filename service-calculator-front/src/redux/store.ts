import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from './calculatorSlice';
import {reducer} from './productReducer'

export const store = configureStore({
    reducer: {
        calculator: calculatorReducer,
        products: reducer
    },
})