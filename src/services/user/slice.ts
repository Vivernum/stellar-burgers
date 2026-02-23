import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getUser, updateUser } from './actions';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isRequestPending: boolean;
};

export const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isRequestPending: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    setUser: (state, action: { payload: TUser }) => {
      state.user = action.payload;
    },
    setIsRequestPending: (state, action: { payload: boolean }) => {
      state.isRequestPending = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectPendingStatus: (state) => state.isRequestPending
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

export const { selectUser, selectIsAuthChecked, selectPendingStatus } =
  userSlice.selectors;

export const { setIsAuthChecked, setUser, setIsRequestPending, logout } =
  userSlice.actions;
