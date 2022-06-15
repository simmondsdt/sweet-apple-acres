import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

export const submitOrder = createAsyncThunk('order/submittingOrder', (arg, { getState }) => {
  const state = getState();
  const { cart, deliveryInfo } = state.order;

  const payload = { items: cart, deliveryAddress: deliveryInfo.address, name: deliveryInfo.name };
  const promise = axios.post(`${process.env.REACT_APP_API_PROXY}/${process.env.REACT_APP_API_URL}/orders`, payload);
  toast.promise(promise, {
    loading: 'Submitting order...',
    success: 'Submitted Order!',
    error: 'There was an error submitting your order',
  });
  return promise;
});

const defaultState = {
  cart: [],
  totalPrice: 0,
  totalItems: 0,
  deliveryInfo: {
    name: '',
    address: '',
  },
  isLoading: false,
  error: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState: defaultState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.productId === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ productId: action.payload.id, quantity: 1 });
      }

      state.totalPrice += action.payload.price;
      state.totalItems += 1;

      toast(
        <span>
          Added <b>{action.payload.name}</b> to cart
        </span>
      );
    },
    removeItemFromCart: (state, action) => {
      if (action.payload.actionType === 'clearCart') {
        state.cart = [];
        state.totalPrice = 0;
        state.totalItems = 0;
      }

      const existingItem = state.cart.find(item => item.productId === action.payload.id);
      if (action.payload.actionType === 'clearItem') {
        state.totalPrice -= action.payload.price * existingItem.quantity;
        state.totalItems -= existingItem.quantity;
        existingItem.quantity = 0;
      } else {
        state.totalPrice -= action.payload.price;
        state.totalItems -= 1;
        existingItem.quantity -= 1;
      }
    },

    updateDeliveryInfo: (state, action) => {
      const { field, value } = action.payload;
      state.deliveryInfo[field] = value;
    },
  },
  extraReducers: {
    [submitOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [submitOrder.fulfilled]: (state, action) => (state = defaultState),
    [submitOrder.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateDeliveryInfo } = orderSlice.actions;

export default orderSlice.reducer;
