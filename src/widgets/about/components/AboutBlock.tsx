import React, { memo } from "react";

interface aboutBlockI {
  title: string;
  info: string;
}

const AboutBlock = ({ title, info }: aboutBlockI) => {
  return (
    <div className="about-block">
      <h2 className="about-block__header">
        <div className="about-block__header__inner">{title}</div>
      </h2>
      <p className="about-block__info">{info}</p>
    </div>
  );
};

export default memo(AboutBlock);
