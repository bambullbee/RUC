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
      className="sett-btn"
      onClick={() => {
        if (theme === "dark") {
          dispatch(changeTheme("light"));
        } else {
          dispatch(changeTheme("dark"));
        }
      }}
    >
      {theme}
    </button>
  );
};

export default ThemeButton;
