import React from "react";

interface MicroBubblePropsI {
  classNameIndex: number;
}

const MicroBubble = ({ classNameIndex }: MicroBubblePropsI) => {
  return (
    <div
      className={`${"display-bg-micro-bubble dbmb__" + classNameIndex}`}
    ></div>
  );
};

export default MicroBubble;
