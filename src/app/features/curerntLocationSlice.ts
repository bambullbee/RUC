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
    resetCur() {
      localStorage.clear();
      return initialState;
    },
  },
});

export const { changeCurrentLocation, resetCur } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
