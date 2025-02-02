import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const body = document.querySelector("body");

let theme: "dark" | "light" =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const veryInitialState: initialMainState = {
  theme,
  personality: "human",
  typingSpeed: 30,
  isTyping: true,
  isScrolling: touchOrMouse === "iPhone" ? true : false,
  restarted: 0,
};

const personality =
  localStorage.getItem("personality") !== null
    ? localStorage.getItem("personality")
    : "human";
const typingSpeed =
  localStorage.getItem("typingSpeed") !== null
    ? (parseInt(localStorage.getItem("typingSpeed")) as 20 | 30 | 300)
    : 30;
theme =
  localStorage.getItem("theme") !== null
    ? (localStorage.getItem("theme") as "dark" | "light")
    : theme;
if (theme === "dark") {
  body.classList.add("dark");
}
const isTyping =
  localStorage.getItem("isTyping") !== null
    ? !!localStorage.getItem("isTyping")
    : true;

type initialMainState = {
  theme: "dark" | "light";
  personality: string;
  typingSpeed: 20 | 30 | 300;
  isTyping: boolean;
  isScrolling: boolean;
  restarted: number;
};

const initialState: initialMainState = {
  theme,
  personality,
  typingSpeed,
  isTyping,
  isScrolling: touchOrMouse === "iPhone" ? true : false,
  restarted: 0,
};

const mainStateSlice = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<"dark" | "light">) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      if (action.payload === "dark") {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    },
    changePersonality(state, action: PayloadAction<string>) {
      state.personality = action.payload;
      localStorage.setItem("personality", action.payload);
    },
    changeTypingSpeed(state) {
      if (state.typingSpeed === 300) {
        state.typingSpeed = 20;
      } else {
        state.typingSpeed += 10;
      }
      localStorage.setItem("typingSpeed", state.typingSpeed.toString());
    },
    changeIsTyping(state, action: PayloadAction<boolean>) {
      state.isTyping = action.payload;
      localStorage.setItem("isTyping", !action.payload ? "" : "true");
    },
    changeIsScrolling(state, action: PayloadAction<boolean> = undefined) {
      if (action.payload) {
        state.isScrolling = action.payload;
      } else {
        state.isScrolling = !state.isScrolling;
      }
    },
    resetMain() {
      localStorage.clear();
      return { ...veryInitialState, restarted: Math.random() };
    },
  },
});

export const {
  resetMain,
  changeTheme,
  changeIsTyping,
  changePersonality,
  changeTypingSpeed,
  changeIsScrolling,
} = mainStateSlice.actions;

export default mainStateSlice.reducer;
