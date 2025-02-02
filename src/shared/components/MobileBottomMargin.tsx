import React from "react";
import touchOrMouse from "../features/touchOrMouseOrIphone";

const MobileBottomMargin = () => {
  return (
    <div
      className={
        touchOrMouse === "touchmove" || touchOrMouse === "iPhone"
          ? "phone-bottom"
          : ""
      }
    ></div>
  );
};

export default MobileBottomMargin;
