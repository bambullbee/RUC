import React, { useMemo } from "react";
import MenuItem from "../UI/MenuItem";
import { currentLocation } from "@/shared/types";
import { bubblePropsI } from "../types/types";

const titles: { title: string; loc: currentLocation }[] = [
  { title: "О сайте", loc: "about" },
  { title: "Настройки", loc: "sett" },
  { title: "Профиль", loc: "prof" },
  { title: "Тест", loc: "test" },
  { title: "О жизни", loc: "life" },
];

const DisplayMenu = ({ style }: bubblePropsI) => {
  const entities = useMemo(() => {
    return titles.map((el) => {
      return <MenuItem text={el.title} loc={el.loc} style={style} />;
    });
  }, [style]);
  return <div className="menu">{entities}</div>;
};

export default DisplayMenu;
