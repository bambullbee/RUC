import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type messangerSectionT = "test" | "life";
type part = { part: number; answers: (0 | 1 | 2)[] };

let test: part = localStorage.getItem("test")
  ? (JSON.parse(localStorage.getItem("test")) as part)
  : { part: 100, answers: [] };
let life: part = { part: 200, answers: [] };
let currentLocation: messangerSectionT = "test";

interface routesI {
  test: part;
  life: part;
}

interface initialStateI {
  routes: routesI;
  currentLocation: keyof routesI;
}

const initialState: initialStateI = {
  routes: { test, life },
  currentLocation,
};

const veryInitialState: initialStateI = {
  routes: {
    test: {
      part: 100,
      answers: [],
    },
    life: {
      part: 200,
      answers: [],
    },
  },
  currentLocation: "test",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    inPartMove(state, action: PayloadAction<0 | 1 | 2>) {
      if (state.currentLocation === "test") {
        localStorage.setItem(
          "test",
          JSON.stringify({
            part: state.routes.test.part + 1,
            answers: [...state.routes.test.answers, action.payload],
          })
        );
      }
      state.routes[state.currentLocation].part += 1;
      state.routes[state.currentLocation].answers.push(action.payload);
    },
    interPartMove(state, action: PayloadAction<messangerSectionT>) {
      state.currentLocation = action.payload;
    },
    resetNav() {
      localStorage.clear();
      return veryInitialState;
    },
  },
});

export const { inPartMove, interPartMove, resetNav } = navigationSlice.actions;

export default navigationSlice.reducer;
