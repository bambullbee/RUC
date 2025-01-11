import { changeTheme } from "./app/features/mainStateSlice";
import { store } from "./app/store";

export default function applyTheme() {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const newColorScheme = event.matches ? "dark" : "light";
      store.dispatch(changeTheme(newColorScheme));
    });
}
