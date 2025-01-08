import React, { useMemo } from "react";

import MicroBubble from "./MicroBubble";

interface BubblePropsI {
  classNameIndex: number;
}

const Bubble = ({ classNameIndex }: BubblePropsI) => {
  const bubbleEntities = useMemo(() => {
    let entities = [];
    for (let e = 1; e < 9; e++) {
      entities.push(<MicroBubble classNameIndex={e} key={e} />);
    }
    return entities;
  }, []);
  return (
    <div className={`${"display-bg-bubble dbb__" + classNameIndex}`}>
      {bubbleEntities}
    </div>
  );
};

export default Bubble;
