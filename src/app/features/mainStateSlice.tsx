import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const body = document.querySelector("body");

const theme =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
if (theme === "dark") {
  body.classList.add("dark");
}

type initialMainState = {
  theme: "dark" | "light";
  personality: string;
  typingSpeed: 0.5 | 1 | 1.5;
  isTyping: boolean;
};

const initialState: initialMainState = {
  theme,
  personality: "human",
  typingSpeed: 1,
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
    changeTypingSpeed(state) {
      if (state.typingSpeed === 1.5) {
        state.typingSpeed = 0.5;
      } else {
        state.typingSpeed += 0.5;
      }
    },
    changeIsTyping(state, action: PayloadAction<boolean>) {
      state.isTyping = action.payload;
    },
  },
});

export const {
  changeTheme,
  changeIsTyping,
  changePersonality,
  changeTypingSpeed,
} = mainStateSlice.actions;

export default mainStateSlice.reducer;
