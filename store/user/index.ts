import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";

export interface IUserStoreModel {
  username: string;
  email: string;
  img_url: string | "";
}

const initialState: {
  data: IUserStoreModel | null;
  token: string | null;
  can_refresh_user: boolean;
} = {
  data: null,
  token: null,
  can_refresh_user: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    GetTokenSlice(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    loginSlice(state, action: PayloadAction<IUserStoreModel>) {
      state.data = action.payload;
    },
    updateImageUrlSlice(state, action: PayloadAction<string>) {
      if (state.data) {
        state.data.img_url = action.payload;
      }
    },
    updateProfileSlice(
      state,
      action: PayloadAction<{ username: string; email: string }>
    ) {
      if (state.data) {
        state.data.username = action.payload.username;
        state.data.email = action.payload.email;
      }
    },
    updateCanRefreshUserSlice(state, action: PayloadAction<boolean>) {
      state.can_refresh_user = action.payload;
    },
    logoutSlice(state) {
      state.data = null;
      state.token = null;
    },
  },
});

export const {
  GetTokenSlice,
  loginSlice,
  updateProfileSlice,
  updateImageUrlSlice,
  updateCanRefreshUserSlice,
  logoutSlice,
} = userSlice.actions;
export const UserReducer = userSlice.reducer;
