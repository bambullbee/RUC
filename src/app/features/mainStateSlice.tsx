import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialMainState } from "@/shared/types";

const body = document.querySelector("body");

const theme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
if (theme === "dark") {
  body.classList.add("dark");
}

const initialState: initialMainState = {
  theme,
  personality: "human",
  language: "russian",
  isTyping: true,
};

const mainStateSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<"dark" | "light">) {
      state.theme = action.payload;
      if (action.payload === "dark") {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    },
    changePersonality(state, action: PayloadAction<string>) {
      state.personality = action.payload;
    },
    changeLanguage(state, action: PayloadAction<"russian" | "kitties">) {
      state.language = action.payload;
    },
    changeIsTyping(state, action: PayloadAction<boolean>) {
      state.isTyping = action.payload;
    },
  },
});

export const {
  changeTheme,
  changeIsTyping,
  changeLanguage,
  changePersonality,
} = mainStateSlice.actions;

export default mainStateSlice.reducer;
