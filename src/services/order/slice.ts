import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders, orderBurger } from './actions';

export type OrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orders: TOrder[] | null;
};

const initialState = {
  orderRequest: false,
  orders: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrders: (state) => {
      if (!state.orders) {
        return [];
      }
      return state.orders;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })

      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        alert('orders error');
      })
});

export const { selectOrderRequest, selectOrders } = orderSlice.selectors;
