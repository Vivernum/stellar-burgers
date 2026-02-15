import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds } from './actions';

export type FeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  currentOrder: TOrder | null;
};

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  currentOrder: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    clearFeeds: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
    setCurrentOrderFeed: (state, action: { payload: number | undefined }) => {
      if (!action.payload) return;
      const order = state.orders.find(
        (order) => order.number === action.payload
      );
      if (order) state.currentOrder = order;
      else state.currentOrder = null;
    }
  },
  selectors: {
    selectFeeds: (state: FeedsState) => {
      if (!state.orders) {
        return [];
      }
      return state.orders;
    },
    selectFeedsStats: (state: FeedsState) => {
      const feeds = {
        total: state.total,
        totalToday: state.totalToday
      };
      return feeds;
    },
    selectCurrentOrder: (state: FeedsState) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        console.log('error');
      });
  }
});

export const { selectFeeds, selectFeedsStats, selectCurrentOrder } =
  feedsSlice.selectors;
export const { clearFeeds, setCurrentOrderFeed } = feedsSlice.actions;
