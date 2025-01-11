import React from "react";
import Bubble from "../UI/Bubble";

import { bubblePropsI } from "../types/types";

const BubbleDisplay = ({ style }: bubblePropsI) => {
  let entities = [];
  for (let e = 1; e < 7; e++) {
    entities.push(<Bubble classNameIndex={e} key={e} style={style} />);
  }
  return <>{entities}</>;
};

export default BubbleDisplay;
