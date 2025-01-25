import React from "react";
import { useDispatch } from "react-redux";

import { resetNav } from "@/app/features/navigationSlice";
import { resetCur } from "@/app/features/curerntLocationSlice";
import { resetMain } from "@/app/features/mainStateSlice";
import { resetProfile } from "@/app/features/profileSlice";

const RestartButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="sett-btn btn-display"
      onClick={() => {
        dispatch(resetProfile());
        dispatch(resetCur());
        dispatch(resetMain());
        dispatch(resetNav());
      }}
    >
      Перезапустить тест
    </button>
  );
};

export default RestartButton;
