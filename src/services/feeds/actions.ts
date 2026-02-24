import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feeds/getFeeds', async () =>
  getFeedsApi()
);
