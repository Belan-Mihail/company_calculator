import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

const initialState: State = {
  products: [],
  loading: true,
  error: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchFail(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchRequest, fetchSuccess, fetchFail } = productSlice.actions;
export default productSlice.reducer;