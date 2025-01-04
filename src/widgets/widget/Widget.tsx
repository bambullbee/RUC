import React from "react";
import SvgS from "./components/SvgS";
import BgDisplay from "./components/BgDisplay";

const WIdget = () => {
  return (
    <section className="app-section container" aria-label="Виджет">
      <div className="right">
        <div className="phone-container">
          <div className="phone">
            <SvgS />
            <BgDisplay />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WIdget;
