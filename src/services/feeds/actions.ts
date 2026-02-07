import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'feeds/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);
