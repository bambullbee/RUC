import { memo } from "react";

import DisplayMenu from "./DisplayMenu";
import Settings from "./Settings";
import BubbleDisplay from "./BubbleDisplay";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

interface displayPropsI {
  applyInvisibilityMLGMode: boolean;
}

const Display = memo(({ applyInvisibilityMLGMode }: displayPropsI) => {
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  );
  let entities;
  let style = applyInvisibilityMLGMode ? 0 : 1;
  if (currentLocation === "none") {
    entities = <BubbleDisplay style={style} />;
  } else if (currentLocation === "menu") {
    entities = <DisplayMenu style={style} />;
  } else if (currentLocation === "sett") {
    entities = <Settings style={style} />;
  }

  return <div className="display-bg">{entities}</div>;
});

export default Display;
