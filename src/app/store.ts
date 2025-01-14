import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";

import navigationReducer from "./features/navigationSlice";
import currentLocationReducer from "./features/curerntLocationSlice";
import mainStateReducer from "./features/mainStateSlice";
import profileReducer from "./features/profileSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    currentLocation: currentLocationReducer,
    mainState: mainStateReducer,
    profile: profileReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
