import React from "react";

import HeaderNavItem from "./UI/HeaderNavItem";
import NarrowHeaderDecor from "./UI/NarrowHeaderDecor";

const titles = [
  { title: "О сайте", zone: "side" },
  { title: "Настройки", zone: "inter" },
  { title: "Профиль", zone: "center" },
  { title: "Занятия", zone: "inter" },
  { title: "Словарик", zone: "side" },
];

const Header = () => {
  return (
    <header>
      <nav className="wide-nav">
        {titles.map((el) => {
          return <HeaderNavItem title={el.title} zone={el.zone} />;
        })}
      </nav>
      <nav className="narrow-nav">
        <button className="header-btn">
          Главное меню
          <NarrowHeaderDecor />
        </button>
      </nav>
    </header>
  );
};

export default Header;
