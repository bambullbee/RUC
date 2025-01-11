import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { RootState } from "@/app/store";
import type { currentLocation } from "@/shared/types";
import { changeCurrentLocation } from "@/app/features/curerntLocationSlice";

interface headerNavItemPropsI {
  title: string;
  zone: string;
  loc: currentLocation;
}

const HeaderNavItem = ({ title, zone, loc }: headerNavItemPropsI) => {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state: RootState) => {
    return state.currentLocation;
  });
  return (
    <div className="wide-nav__link">
      <div className="wide-nav__inner-linkwrapper">
        <button
          onClick={() => {
            if (currentLocation === loc) {
              dispatch(changeCurrentLocation("none"));
            } else {
              dispatch(changeCurrentLocation(loc));
            }
          }}
        >
          <span
            className={`${"wide-nav__link-text wide-nav__link-text--" + zone}`}
          >
            {title}
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeaderNavItem;
