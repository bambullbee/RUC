import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type currentLocationT = "test" | "help";

let test = 1;
let help = 2;
let mood = 3;
let currentLocation: currentLocationT = "test";

if (localStorage.length !== 0) {
  test = parseFloat(localStorage.getItem("test"));
  help = parseFloat(localStorage.getItem("help"));
  currentLocation = localStorage.getItem("currentLocation") as currentLocationT;
}

interface routesI {
  test: number;
  help: number;
}

interface initialStateI {
  routes: routesI;
  currentLocation: keyof routesI;
}

const initialState: initialStateI = {
  routes: { test, help },
  currentLocation,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    inPartMove(state) {
      state.routes[currentLocation] += 0.01;
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
