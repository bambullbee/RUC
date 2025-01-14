import React from "react";
import { useDispatch } from "react-redux";

import { restart } from "@/app/features/navigationSlice";

const RestartButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="sett-btn btn-display"
      onClick={() => dispatch(restart())}
    >
      Перезапустить тест
    </button>
  );
};

export default RestartButton;
