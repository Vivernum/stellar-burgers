import {
  getUserApi,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('user/getUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);
