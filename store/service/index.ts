import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IServiceItem } from "../../utils/interfaces";

const initialState: {
  data: IServiceItem[];
  can_refresh_list: boolean;
} = {
  data: [],
  can_refresh_list: false,
};

const serviceSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    FetchServiceListSlice(state, action: PayloadAction<IServiceItem[]>) {
      state.data = action.payload;
    },
    RemoveServiceSlice(state, action: PayloadAction<number>) {
      if (state.data.length) {
        state.data = state.data.filter((service) => {
          return service.service_id !== action.payload;
        });
      }
    },
    UpdateServiceSlice(state, action: PayloadAction<IServiceItem>) {
      if (state.data.length) {
        state.data = state.data.filter(
          (service) => service.service_id !== action.payload.service_id
        );
        state.data.push(action.payload);
      }
    },
    UpdateRefreshListSlice(state, action: PayloadAction<boolean>) {
      state.can_refresh_list = action.payload;
    },
    AddServiceSlice(state, action: PayloadAction<IServiceItem>) {
      state.data.push(action.payload);
    },
  },
});

export const {
  FetchServiceListSlice,
  AddServiceSlice,
  RemoveServiceSlice,
  UpdateServiceSlice,
  UpdateRefreshListSlice,
} = serviceSlice.actions;
export const ServiceReducer = serviceSlice.reducer;
