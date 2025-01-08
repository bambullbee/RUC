import React, { useMemo } from "react";

import Bubble from "../UI/Bubble";

const Display = () => {
  const displayEntities = useMemo(() => {
    let entities = [];
    for (let e = 1; e < 7; e++) {
      entities.push(<Bubble classNameIndex={e} key={e} />);
    }
    return entities;
  }, []);

  return <div className="display-bg">{displayEntities}</div>;
};

export default Display;
