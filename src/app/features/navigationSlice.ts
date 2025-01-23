import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type messangerSectionT = "test" | "about";
type part = { part: number; answers: (0 | 1 | 2)[] };

let test: part = { part: 100, answers: [] };
let about: part = { part: 200, answers: [] };
let currentLocation: messangerSectionT = "test";

interface routesI {
  test: part;
  about: part;
}

interface initialStateI {
  routes: routesI;
  currentLocation: keyof routesI;
  isRestarted: number;
}

const initialState: initialStateI = {
  routes: { test, about },
  currentLocation,
  isRestarted: 0,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    inPartMove(state) {
      state.routes[currentLocation].part += 0.01;
      localStorage.setItem(
        currentLocation,
        state.routes[currentLocation].toString()
      );
    },
    interPartMove(state, action: PayloadAction<messangerSectionT>) {
      state.currentLocation = action.payload;
      localStorage.setItem("currentLocation", action.payload);
    },
    restart(state) {
      state.routes = { test, about };
      state.currentLocation = "test";
      state.isRestarted += 1;
    },
  },
});

export const { inPartMove, interPartMove, restart } = navigationSlice.actions;

export default navigationSlice.reducer;
