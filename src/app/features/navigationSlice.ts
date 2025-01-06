import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// !!!!
type currentLocationT = "test" | "help";
// !!!!

let test = 100;
let help = 200;
let mood = 300;
let currentLocation: currentLocationT = "test";

if (localStorage.length !== 0) {
  test = parseInt(localStorage.getItem("test"));
  help = parseInt(localStorage.getItem("help"));
  mood = parseInt(localStorage.getItem("mood"));
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
    answerQuestion(state) {},
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
