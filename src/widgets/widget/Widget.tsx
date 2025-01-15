import React, { memo, useEffect, useState } from "react";
import SvgS from "./components/SvgS";
import Display from "./components/Display";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { currentLocation } from "@/shared/types";

const Widget = memo(() => {
  const currentLoc = useSelector((state: RootState): currentLocation => {
    return state.currentLocation;
  });
  const [applyInvisibilityMLGMode, setApplyInvisibilityMLGMode] =
    useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<currentLocation>(currentLoc);
  useEffect(() => {
    setApplyInvisibilityMLGMode(true);
    let timer = setTimeout(() => {
      setApplyInvisibilityMLGMode(false);
      setCurrentLocation(currentLoc);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentLoc]);
  return (
    <section className="app-section container" aria-label="Виджет">
      <div className="right">
        <div className="phone-container">
          <div className="phone">
            <SvgS />
            <Display applyInvisibilityMLGMode={applyInvisibilityMLGMode} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Widget;
