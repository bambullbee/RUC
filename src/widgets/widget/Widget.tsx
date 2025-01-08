import React, { memo } from "react";
import SvgS from "./components/SvgS";
import BgDisplay from "./components/Display";

const WIdget = memo(() => {
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
});

export default WIdget;
