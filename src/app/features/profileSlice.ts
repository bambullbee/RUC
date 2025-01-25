import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import generateRandomColor from "@/shared/features/randomColourFn";
import { createAppAsyncThunk } from "@/shared/withTypes/createAsyncThunk";

export const fetchCatPhoto = createAppAsyncThunk(
  "profile/fetchCatPhoto",
  async () => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    localStorage.setItem("url", data[0].url);
    return data[0].url;
  }
);
type paw = [string, string, string, string, string];

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
  paw: paw;
  loyalty: number;
  isVisible: boolean;
  bannerUsed: boolean;
  sex: "male" | "female";
}

const species = localStorage.getItem("species")
  ? localStorage.getItem("species")
  : null;
const mood = localStorage.getItem("mood") ? localStorage.getItem("mood") : null;
const url = localStorage.getItem("url") ? localStorage.getItem("url") : "";
const paw = localStorage.getItem("paw")
  ? (JSON.parse(localStorage.getItem("paw")) as paw)
  : null;
const loyalty = localStorage.getItem("loyalty")
  ? parseFloat(localStorage.getItem("loyalty"))
  : 0;
const sex = localStorage.getItem("sex")
  ? (localStorage.getItem("sex") as "male" | "female")
  : "male";
const bannerUsed = localStorage.getItem("bannerUsed")
  ? !!localStorage.getItem("bannerUsed")
  : false;

const initialState: initialStateI = {
  species,
  mood,
  photo: { isPhoto: false, url, loading: "idle", error: null },
  paw,
  loyalty,
  isVisible: false,
  bannerUsed,
  sex,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeSpecies(state, action: PayloadAction<string>) {
      localStorage.setItem("species", action.payload);
      state.species = action.payload;
    },
    changeMood(state, action: PayloadAction<string>) {
      localStorage.setItem("mood", action.payload);
      state.mood = action.payload;
    },
    changePaw(state) {
      if (state.paw === null) {
        state.loyalty += 1;
      }
      const paw: paw = [
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
        generateRandomColor(),
      ];
      localStorage.setItem("paw", JSON.stringify(paw));
      state.paw = paw;
    },
    changeLoyalty(state, action: PayloadAction<number>) {
      localStorage.setItem(
        "loyalty",
        (state.loyalty + action.payload).toString()
      );
      state.loyalty += action.payload;
    },
    changeVisibility(state) {
      state.isVisible = !state.isVisible;
    },
    changeBanner(state) {
      localStorage.setItem("bannerUsed", bannerUsed ? "true" : "");
      state.bannerUsed = !state.bannerUsed;
    },
    changeSex(state, action) {
      localStorage.setItem("sex", action.payload);
      state.sex = action.payload;
    },
    resetProfile() {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatPhoto.fulfilled, (state, action) => {
      if (state.photo.url === "") {
        state.loyalty += 1;
      }
      state.photo.url = action.payload;
    });
  },
});

export const {
  changeSpecies,
  changeLoyalty,
  changeMood,
  changePaw,
  resetProfile,
  changeVisibility,
  changeBanner,
  changeSex,
} = profileSlice.actions;

export default profileSlice.reducer;
