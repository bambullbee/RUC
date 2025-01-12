import { currentLocation } from "@/shared/types";
import React from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocation } from "@/app/features/curerntLocationSlice";
import { RootState } from "@/app/store";

import { bubblePropsI } from "../types/types";

interface menuItemPropsI extends bubblePropsI {
  text: string;
  loc: currentLocation;
}

const MenuItem = ({ text, loc, style }: menuItemPropsI) => {
  if (text == "О сайте") {
    console.log(style);
  }
  const dispatch = useDispatch();
  return (
    <div className="menu-item">
      <button
        className="menu-item__inner btn-display"
        style={{ opacity: style }}
        onClick={() => {
          dispatch(changeCurrentLocation(loc));
        }}
      >
        <div className="menu-item__inner__text">{text}</div>
      </button>
    </div>
  );
};

export default MenuItem;
