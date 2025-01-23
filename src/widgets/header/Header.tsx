import React, { Dispatch, memo, SetStateAction } from "react";
import { changeCurrentLocation } from "@/app/features/curerntLocationSlice";
import { useDispatch, UseDispatch, useSelector } from "react-redux";

import { RootState } from "@/app/store";

import HeaderNavItem from "./UI/HeaderNavItem";
import NarrowHeaderDecor from "./UI/NarrowHeaderDecor";
import { currentLocation } from "@/shared/types";

const titles: { title: string; zone: string; loc: currentLocation }[] = [
  { title: "О сайте", zone: "side", loc: "about" },
  { title: "Настройки", zone: "inter", loc: "sett" },
  { title: "Профиль", zone: "center", loc: "prof" },
  { title: "Занятия", zone: "inter", loc: "quests" },
  { title: "Словарик", zone: "side", loc: "dict" },
];

const Header = memo(() => {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state: RootState): currentLocation => {
    return state.currentLocation;
  });
  return (
    <header className={currentLocation === "about" ? "header__out" : ""}>
      <nav className="wide-nav">
        {titles.map((el) => {
          return <HeaderNavItem title={el.title} zone={el.zone} loc={el.loc} />;
        })}
      </nav>
      <nav className="narrow-nav">
        <button
          className="header-btn"
          onClick={() => {
            if (currentLocation !== "menu") {
              dispatch(changeCurrentLocation("menu"));
            } else if (currentLocation === "menu") {
              dispatch(changeCurrentLocation("none"));
            }
          }}
        >
          Главное меню
          <NarrowHeaderDecor />
        </button>
      </nav>
    </header>
  );
});

export default Header;
