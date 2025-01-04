import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type currentLocationT = "start" | "test" | "help";

let test = 2;
let help = 3;
let start = 1;
let currentLocation: currentLocationT = "start";

if (localStorage.length !== 0) {
  test = parseFloat(localStorage.getItem("test"));
  help = parseFloat(localStorage.getItem("help"));
  start = parseFloat(localStorage.getItem("start"));
  currentLocation = localStorage.getItem("currentLocation") as currentLocationT;
}

interface routesI {
  test: number;
  help: number;
  start: number;
}

interface initialStateI {
  routes: routesI;
  currentLocation: keyof routesI;
}

const initialState: initialStateI = {
  routes: { test, help, start },
  currentLocation,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    inPartMove(state) {
      state.routes[currentLocation] += 0.1;
      localStorage.setItem(
        currentLocation,
        state.routes[currentLocation].toString()
      );
    },
    interPartMove(state, action: PayloadAction<currentLocationT>) {
      state.currentLocation = action.payload;
      localStorage.setItem("currentLocation", action.payload);
    },
  },
});

export const { inPartMove, interPartMove } = navigationSlice.actions;

export default navigationSlice.reducer;
