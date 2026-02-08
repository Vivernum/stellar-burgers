import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrders } from './actions';

export type OrderState = {
  orderRequest: boolean;
  orders: TOrder[] | null;
  orderModalData: TOrder | null;
  currentOrder: TOrder | null;
};

const initialState: OrderState = {
  orderRequest: false,
  orders: null,
  orderModalData: null,
  currentOrder: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder: (state, action: { payload: number | undefined }) => {
      if (!action.payload) return;
      const order = state.orders!.find(
        (order) => order.number === action.payload
      );
      if (order) state.currentOrder = order;
      else state.currentOrder = null;
    },
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
    selectCurrentOrderAlt: (state) => state.currentOrder
  },
  extraReducers: (builder) =>
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        alert('orders error');
      })
});

export const { selectOrderRequest, selectOrders, selectOrderModalData } =
  orderSlice.selectors;

export const { setCurrentOrder, closeModal, setOrderRequest, setOrders } =
  orderSlice.actions;
