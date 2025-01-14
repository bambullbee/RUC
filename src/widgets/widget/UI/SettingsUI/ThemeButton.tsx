import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { changeTheme } from "@/app/features/mainStateSlice";
import { RootState } from "@/app/store";

interface themeButtonpropsI {}

const ThemeButton = () => {
  const theme = useSelector((state: RootState) => state.mainState.theme);
  const dispatch = useDispatch();
  return (
    <button
      className="sett-btn btn-display"
      onClick={() => {
        if (theme === "dark") {
          dispatch(changeTheme("light"));
        } else {
          dispatch(changeTheme("dark"));
        }
      }}
    >
      Тема {theme === "dark" ? "ТЕМНАЯ" : "СВЕТЛАЯ"}
    </button>
  );
};

export default ThemeButton;
