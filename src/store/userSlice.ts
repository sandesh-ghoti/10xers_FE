import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../constant';

const initialState = {
  user: {} as IUser,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {} as IUser;
      state.isLoggedIn = false;
    },
  },
  selectors: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
  },
});

export const { login, logout } = userSlice.actions;
export const { isLoggedIn, user } = userSlice.selectors;
export default userSlice.reducer;
