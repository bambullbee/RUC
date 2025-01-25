import { useRef } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "@/app/store";
import { currentLocation } from "@/shared/types";
import { Test } from "@/features/test";
import { Life } from "@/features/life";

const Messanger = () => {
  const messanger = useRef(null);
  const currentLocation = useSelector(
    (state: RootState) => state.currentLocation
  ) as currentLocation;
  const mainNav = useSelector(
    (state: RootState) => state.navigation.currentLocation
  );
  return (
    <section
      className={`dialogue-window container ${
        currentLocation === "about" ? "dialogue__out" : ""
      }`}
      aria-label="Диалоговое окно"
      ref={messanger}
    >
      {mainNav === "test" ? <Test ref={messanger} /> : <Life />}
    </section>
  );
};

export default Messanger;
