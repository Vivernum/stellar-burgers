import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './actions';
import { deleteCookie, setCookie } from '../../utils/cookie';

export type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isRequestPending: boolean;
  error: string | null;
};

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isRequestPending: false,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    // для отладки
    setUser: (state, action: { payload: TUser }) => {
      state.user = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectPendingStatus: (state) => state.isRequestPending,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isRequestPending = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isRequestPending = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.isRequestPending = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isRequestPending = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRequestPending = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isRequestPending = false;
        alert('login error' + action.error.message);
      })

      .addCase(registerUser.pending, (state) => {
        state.isRequestPending = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isRequestPending = false;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        alert('register error' + action.error.message);
      })

      .addCase(logoutUser.pending, (state) => {
        state.isRequestPending = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isRequestPending = false;
        deleteCookie('accessToken');
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isRequestPending = false;
        alert('logout error' + action.error.message);
      })

      .addCase(updateUser.pending, (state) => {
        state.isRequestPending = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isRequestPending = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isRequestPending = false;
        alert('update error' + action.error.message);
      });
  }
});

export const {
  selectUser,
  selectIsAuthChecked,
  selectError,
  selectPendingStatus
} = userSlice.selectors;

export const { setIsAuthChecked, setUser } = userSlice.actions;
