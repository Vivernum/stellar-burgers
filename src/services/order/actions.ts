import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);
