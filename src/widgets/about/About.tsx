import { RootState } from "@/app/store";
import { currentLocation } from "@/shared/types";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import AboutBlock from "./components/AboutBlock";
import BackButton from "./components/BackButton";
import { localData } from "./data/data";

const About = () => {
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  ) as currentLocation;

  return (
    <section
      className={`about-section ${
        currentLocation === "about" ? "about-section__in" : ""
      }`}
    >
      <BackButton />
      {localData.map((block) => {
        return <AboutBlock title={block.title} info={block.info} />;
      })}
    </section>
  );
};

export default memo(About);
