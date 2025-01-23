import { changeCurrentLocation } from "@/app/features/curerntLocationSlice";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

const BackButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        console.log("fired");
        dispatch(changeCurrentLocation("none"));
      }}
      className="about-block__btn"
    >
      Назад
    </button>
  );
};

export default memo(BackButton);
