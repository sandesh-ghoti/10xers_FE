import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../constant';
interface IState {
  user: IUser | null;
  isLoggedIn: boolean;
  errorMsg: null | string;
}
const initialState: IState = {
  user: null,
  isLoggedIn: false,
  errorMsg: null,
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
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
    removeErrorMsg: (state) => {
      state.errorMsg = null;
    },
  },
  selectors: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    errorMsg: (state) => state.errorMsg,
  },
});

export const { login, logout, setErrorMsg, removeErrorMsg } = userSlice.actions;
export const { isLoggedIn, user, errorMsg } = userSlice.selectors;
export default userSlice.reducer;
