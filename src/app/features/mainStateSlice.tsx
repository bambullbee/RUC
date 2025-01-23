import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
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
  typingSpeed: 20 | 30 | 40;
  isTyping: boolean;
  isScrolling: boolean;
};

const initialState: initialMainState = {
  theme,
  personality: "human",
  typingSpeed: 30,
  isTyping: true,
  isScrolling: touchOrMouse === "iPhone" ? true : false,
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
      if (state.typingSpeed === 40) {
        state.typingSpeed = 20;
      } else {
        state.typingSpeed += 10;
      }
    },
    changeIsTyping(state, action: PayloadAction<boolean>) {
      state.isTyping = action.payload;
    },
    changeIsScrolling(state, action: PayloadAction<boolean> = undefined) {
      if (action.payload) {
        state.isScrolling = action.payload;
      } else {
        state.isScrolling = !state.isScrolling;
      }
    },
  },
});

export const {
  changeTheme,
  changeIsTyping,
  changePersonality,
  changeTypingSpeed,
  changeIsScrolling,
} = mainStateSlice.actions;

export default mainStateSlice.reducer;
