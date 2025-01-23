import React, { useState } from "react";

import touchOrMouse from "@/shared/features/touchOrMouseOrIphone";

interface bannerPropsI {
  isScrolling: boolean;
}

const Banner = ({ isScrolling }: bannerPropsI) => {
  const [wasAppeared, setWasAppeared] = useState(
    touchOrMouse === "iPhone" ? true : false
  );

  return isScrolling && !wasAppeared ? (
    <div
      className="banner"
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
