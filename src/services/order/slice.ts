import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getOrders } from './actions';

export type OrderState = {
  orderRequest: boolean;
  orders: TOrder[] | null;
  orderModalData: TOrder | null;
  ordersByNumber: TOrder | null;
};

export const initialState: OrderState = {
  orderRequest: false,
  orders: null,
  orderModalData: null,
  ordersByNumber: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderRequest: (state, action: { payload: boolean }) => {
      state.orderRequest = action.payload;
    },
    setOrders: (state, action: { payload: TOrder }) => {
      state.orderModalData = action.payload;
    },
    closeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData,
    selectOrders: (state) => {
      if (!state.orders) {
        return [];
      }
      return state.orders;
    },
    selectOrderByNumber: (state) => state.ordersByNumber
  },
  extraReducers: (builder) =>
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        console.log('orders error');
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.ordersByNumber = action.payload.orders[0];
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        console.log('order by number error');
        state.orderRequest = false;
      })
});

export const {
  selectOrderRequest,
  selectOrders,
  selectOrderModalData,
  selectOrderByNumber
} = orderSlice.selectors;

export const { closeModal, setOrderRequest, setOrders } = orderSlice.actions;
