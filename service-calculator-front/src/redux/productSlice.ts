import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product'

type State = {
    products: Product[],
    loading: boolean,
    error: string   
}

type Action = 
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_SUCCESS'; payload: Product[] }
    | { type: 'FETCH_FAIL'; payload: string };

// Initial State
const initialState: State = {
    products: [],
    loading: true,
    error: ''
}


