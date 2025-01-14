import { currentLocation } from "@/shared/types";

import { useDispatch } from "react-redux";
import { changeCurrentLocation } from "@/app/features/curerntLocationSlice";
import { changeVisibility } from "@/app/features/profileSlice";

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
          if (loc !== "prof") {
            dispatch(changeCurrentLocation(loc));
          } else {
            dispatch(changeVisibility());
          }
        }}
      >
        <div className="menu-item__inner__text">{text}</div>
      </button>
    </div>
  );
};

export default MenuItem;
