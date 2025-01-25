import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import generateRandomColor from "@/shared/features/randomColourFn";
import { createAppAsyncThunk } from "@/shared/withTypes/createAsyncThunk";

export const fetchCatPhoto = createAppAsyncThunk(
  "profile/fetchCatPhoto",
  async (_, { rejectWithValue }) => {
    let response;
    try {
      response = await fetch("https://api.thecatapi.com/v1/images/search");
    } catch (error) {
      return rejectWithValue(
        navigator.onLine
          ? "Ошибка! Мы над ней уже работаем."
          : "Проверьте Ваше соединение"
      );
    }
    if (!response.ok) {
      return rejectWithValue("Ошибка! Мы над ней уже работаем.");
    }
    const data = await response.json();
    localStorage.setItem("url", data[0].url);
    return data[0].url;
  }
);
type paw = [string, string, string, string, string];

interface photoI {
  isPhoto: boolean;
  url: string;
  loading: "idle" | "pending" | "error";
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

const veryInitialState: initialStateI = {
  species: null,
  mood: null,
  photo: { isPhoto: false, url: "", loading: "idle", error: null },
  paw: null,
  loyalty: 0,
  isVisible: false,
  bannerUsed: false,
  sex: "male",
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
        localStorage.setItem("loyalty", (state.loyalty + 1).toString());
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
      return veryInitialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatPhoto.fulfilled, (state, action) => {
      if (state.photo.url === "") {
        localStorage.setItem("loyalty", (state.loyalty + 1).toString());
        state.loyalty += 1;
      }
      state.photo.loading = "idle";
      state.photo.url = action.payload;
      state.photo.error = null;
    });
    builder.addCase(fetchCatPhoto.pending, (state) => {
      state.photo.loading = "pending";
    });
    builder.addCase(fetchCatPhoto.rejected, (state, action) => {
      state.photo.loading = "error";
      state.photo.error = action.payload as string;
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
