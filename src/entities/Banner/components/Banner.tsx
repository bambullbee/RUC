import React, { useState } from "react";

import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { currentLocation } from "@/shared/types";

interface bannerPropsI {
  isScrolling: boolean;
}

const Banner = ({ isScrolling }: bannerPropsI) => {
  const [wasAppeared, setWasAppeared] = useState(
    touchOrMouse === "iPhone" ? true : false
  );
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  ) as currentLocation;

  return isScrolling && !wasAppeared ? (
    <div
      className={`banner ${currentLocation === "about" ? "banner__out" : ""}`}
      onClick={() => {
        setWasAppeared(true);
      }}
    >
      Нажимай на кнопку справа, чтобы переключаться между режимами
      авто-прокрутки. И нажимай на меня, чтобы убрать эту мешающую штуку.
    </div>
  ) : (
    ""
  );
};

export default Banner;
