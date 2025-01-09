import React, { memo } from "react";

import Bubble from "../UI/Bubble";
import DisplayMenu from "./DisplayMenu";

interface displayPropsI {
  isWidgetMenu: boolean;
}

const Display = memo(({ isWidgetMenu }: displayPropsI) => {
  let entities;
  if (!isWidgetMenu) {
    entities = [];
    for (let e = 1; e < 7; e++) {
      entities.push(<Bubble classNameIndex={e} key={e} />);
    }
  } else {
    entities = <DisplayMenu />;
  }

  return <div className="display-bg">{entities}</div>;
});

export default Display;
