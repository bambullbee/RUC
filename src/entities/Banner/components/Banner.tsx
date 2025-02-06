import React, { useState } from "react";

import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { currentLocation } from "@/shared/types";

interface bannerPropsI {
  isScrolling: boolean;
}

const Banner = ({ isScrolling }: bannerPropsI) => {
  const [wasAppeared, setWasAppeared] = useState(false);
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  ) as currentLocation;

  return !wasAppeared ? (
    <div
      className={`banner ${currentLocation === "about" ? "banner__out" : ""}`}
      onClick={() => {
        setWasAppeared(true);
      }}
    >
      Нажимай на кнопку в правом верхнем углу окна с чатом, чтобы переключаться
      между режимами авто-прокрутки. Нажатие на меня скроет подсказку.
    </div>
  ) : (
    ""
  );
};

export default Banner;
