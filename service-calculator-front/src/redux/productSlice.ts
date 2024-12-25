import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../types/Product'

type State = {
    products: Product[],
    loading: boolean,
    error: string   
}