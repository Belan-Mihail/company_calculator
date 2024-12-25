import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product'

type State = {
    products: Product[],
    loading: boolean,
    error: string   
}

// Initial State
const initialState: State = {
    products: [],
    loading: true,
    error: ''
}

// Create an asynchronous action to load products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', 
    async (ThunkAPI) => {
        const response = await fetch('http://localhost:3000/api/products')
        if (!response.ok) {
            return ThunkAPI.rejectWithValue('Failed to fetch products')
        }
        return response.json()
    }
)