import React, { memo, useMemo } from "react";

import MicroBubble from "./MicroBubble";
import { bubblePropsI } from "@/widgets/widget/types/types";

interface BubblePropsI extends bubblePropsI {
  classNameIndex: number;
}

const Bubble = ({ classNameIndex, style }: BubblePropsI) => {
  const bubbleEntities = useMemo(() => {
    let entities = [];
    for (let e = 1; e < 9; e++) {
      entities.push(<MicroBubble classNameIndex={e} key={e} />);
    }
    return entities;
  }, []);
  return (
    <div
      className={`${"display-bg-bubble dbb__" + classNameIndex}`}
      style={{ opacity: style }}
    >
      {bubbleEntities}
    </div>
  );
};

export default memo(Bubble);
