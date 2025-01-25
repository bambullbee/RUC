import React from "react";

interface lifeBlockI {
  text: string;
  index: number;
  inactive: boolean;
  onClick: (index: number) => void;
}

const LifeBlock = ({ text, index, onClick, inactive }: lifeBlockI) => {
  return (
    <div className="life-block">
      <div
        className={`life-block__inner ${
          inactive ? "life-block__inner__inactive" : ""
        }`}
        onClick={() => onClick(index)}
      >
        {text}
      </div>
    </div>
  );
};

export default LifeBlock;
