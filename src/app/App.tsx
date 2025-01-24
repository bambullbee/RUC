import "../style.css";

import Header from "@/widgets/header/index";
import Messanger from "@/widgets/messanger/index";
import Widget from "@/widgets/widget/index";
import GlobalBg from "./glogalBG/components/GlobalBg";
import { useEffect, useState } from "react";
import Banner from "@/entities/Banner/components/Banner";

import { changeCurrentLocation } from "./features/curerntLocationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { currentLocation } from "@/shared/types";
import Profile from "@/widgets/profile/Profile";
import { changeIsScrolling } from "./features/mainStateSlice";
import { About } from "@/widgets/about";

const App = () => {
  const isScrolling = useSelector(
    (state: RootState) => state.mainState.isScrolling
  );
  const currentLocation = useSelector(
    (state: RootState): currentLocation => state.currentLocation
  );
  const dispatch = useDispatch();
  useEffect(() => {
    function resizeHandler() {
      // console.log(
      //   window.innerWidth > 992,
      //   window.innerWidth / window.innerHeight < 2
      // );
      if (
        window.innerWidth > 992 &&
        window.innerWidth / window.innerHeight < 2
      ) {
        if (currentLocation === "menu") {
          dispatch(changeCurrentLocation("none"));
        }
      }
    }
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  const sex = useSelector((state: RootState) => state.profile.sex);
  return (
    <>
      <Header />
      <main>
        <Messanger />
        <Widget />
        <button
          className={`scroll-prevent-btn ${
            currentLocation === "about" ? "dialogue__out" : ""
          }`}
          style={{
            backgroundColor: isScrolling
              ? "var(--primary-HO-color)"
              : "var(--secondary-HO-color)",
          }}
          onClick={() => {
            dispatch(changeIsScrolling());
            if (isScrolling) {
              const messangerBlock = document.querySelector(".dialogue-window");
              messangerBlock.scrollTo({
                top: messangerBlock.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
        ></button>
        <Banner isScrolling={isScrolling} />
        <Profile />
        <About />
      </main>
      <GlobalBg />
    </>
  );
};

export default App;
