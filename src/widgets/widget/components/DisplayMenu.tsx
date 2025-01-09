import React, { useMemo } from "react";
import MenuItem from "../UI/MenuItem";

const titles = ["О сайте", "Настройки", "Профиль", "Занятия", "Словарик"];

const DisplayMenu = () => {
  const entities = useMemo(() => {
    return titles.map((el) => {
      return <MenuItem text={el} />;
    });
  }, []);
  return <div className="menu">{entities}</div>;
};

export default DisplayMenu;
