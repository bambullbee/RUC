import React from "react";

interface menuItemPropsI {
  text: string;
}

const MenuItem = ({ text }: menuItemPropsI) => {
  return (
    <div className="menu-item">
      <div className="menu-item__inner">
        <div className="menu-item__inner__text">{text}</div>
      </div>
    </div>
  );
};

export default MenuItem;
