import React, { useState } from "react";

interface bannerPropsI {
  isScrolling: boolean;
}

const Banner = ({ isScrolling }: bannerPropsI) => {
  const [wasAppeared, setWasAppeared] = useState(false);

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
