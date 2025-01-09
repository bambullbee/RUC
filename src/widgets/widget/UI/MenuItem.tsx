import React from "react";

interface menuItemPropsI {
  text: string;
}

const MenuItem = ({ text }: menuItemPropsI) => {
  return (
    <div className="menu-item">
      <div className="menu-item__inner">{text}</div>
    </div>
  );
};

export default MenuItem;
