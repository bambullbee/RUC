import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { currentLocation } from "@/shared/types";

const initialState: currentLocation = "none";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState,
  reducers: {
    changeCurrentLocation: (state, action: PayloadAction<any>) => {
      return action.payload;
    },
  },
});

export const { changeCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
