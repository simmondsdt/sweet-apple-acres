import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const getProducts = createAsyncThunk('product/productsLoading', filter =>
  axios.get(`${process.env.REACT_APP_API_PROXY}/${process.env.REACT_APP_API_URL}/products`)
);

const initialState = {
  isLoading: true,
  data: [],
  error: {},
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => (state = { isLoading: true, data: [], error: {} }),
    [getProducts.fulfilled]: (state, action) => (state = { isLoading: false, data: action.payload.data, error: {} }),
    [getProducts.rejected]: (state, action) => {
      toast.error('There was an error loading products');
      state = { isLoading: false, data: [], error: action.error };
    },
  },
});

export default productSlice.reducer;
