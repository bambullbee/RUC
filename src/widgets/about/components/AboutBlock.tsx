import React, { memo, useEffect, useRef } from "react";

interface aboutBlockI {
  title: string;
  info: string;
}

const AboutBlock = ({ title, info }: aboutBlockI) => {
  const paragraph = useRef(null);
  return (
    <div className="about-block">
      <h2 className="about-block__header">
        <button
          className="about-block__header__inner"
          onClick={() => {
            paragraph.current.classList.toggle("about-block__info__visible");
          }}
        >
          {title}
        </button>
      </h2>
      <p className="about-block__info" ref={paragraph}>
        <div className="about-block__info__inner">
          {" "}
          <div className="paragraph">{info}</div>
        </div>
      </p>
    </div>
  );
};

export default memo(AboutBlock);
