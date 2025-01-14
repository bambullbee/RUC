import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import generateRandomColor from "@/shared/features/randomColourFn";
import { createAppAsyncThunk } from "@/shared/withTypes/createAsyncThunk";

export const fetchCatPhoto = createAppAsyncThunk(
  "profile/fetchCatPhoto",
  () => {}
);

interface photoI {
  isPhoto: boolean;
  url: string;
  loading: "idle" | "pending" | "success" | "error";
  error: string;
}

interface initialStateI {
  species: string;
  mood: string;
  photo: photoI;
  paw: [string, string, string, string, string];
  loyalty: number;
  isVisible: boolean;
  bannerUsed: boolean;
}

const initialState: initialStateI = {
  species: null,
  mood: null,
  photo: { isPhoto: false, url: "", loading: "idle", error: null },
  paw: null,
  loyalty: null,
  isVisible: false,
  bannerUsed: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeSpecies(state, action: PayloadAction<string>) {
      state.species = action.payload;
    },
    changeMood(state, action: PayloadAction<string>) {
      state.mood = action.payload;
    },
    changePhoto(state, action: PayloadAction<photoI>) {
      state.photo = action.payload;
    },
    changePaw(state) {
      state.paw = [
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
      ];
    },
    changeLoyalty(state, action: PayloadAction<number>) {
      state.loyalty = action.payload;
    },
    changeVisibility(state) {
      state.isVisible = !state.isVisible;
    },
    changeBanner(state) {
      state.bannerUsed = !state.bannerUsed;
    },
    reset() {
      return initialState;
    },
  },
});

export const {
  changeSpecies,
  changeLoyalty,
  changeMood,
  changePaw,
  changePhoto,
  reset,
  changeVisibility,
  changeBanner,
} = profileSlice.actions;

export default profileSlice.reducer;
