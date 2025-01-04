import React from "react";

interface headerNavItemPropsI {
  title: string;
  zone: string;
}

const HeaderNavItem = ({ title, zone }: headerNavItemPropsI) => {
  return (
    <div className="wide-nav__link">
      <div className="wide-nav__inner-linkwrapper">
        <button>
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
