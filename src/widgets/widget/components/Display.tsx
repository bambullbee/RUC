import { memo, useMemo, useState } from "react";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

import DisplayMenu from "./DisplayMenu";
import Settings from "./Settings";
import Profile from "./Profile";
import BubbleDisplay from "./BubbleDisplay";
import { currentLocation } from "@/shared/types";

interface displayPropsI {
  currentLocation: currentLocation;
  applyInvisibilityMLGMode: boolean;
}

const Display = memo(
  ({ currentLocation, applyInvisibilityMLGMode }: displayPropsI) => {
    let entities;
    let style = applyInvisibilityMLGMode ? 0 : 1;
    if (currentLocation === "none") {
      entities = <BubbleDisplay style={style} />;
    } else if (currentLocation === "menu") {
      entities = <DisplayMenu style={style} />;
    } else if (currentLocation === "sett") {
      entities = <Settings style={style} />;
    } else if (currentLocation === "prof") {
      entities = <Profile style={style} />;
    }

    return <div className="display-bg">{entities}</div>;
  }
);

export default Display;
