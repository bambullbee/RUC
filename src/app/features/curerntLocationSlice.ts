import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type currentLocation = "about" | "sett" | "prof" | "quests" | "dict" | "none";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: "none",
  reducers: {
    changeCurrentLocation(state, action: PayloadAction<currentLocation>) {
      state = action.payload;
    },
  },
});

export const { changeCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;
