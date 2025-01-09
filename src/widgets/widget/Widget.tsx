import React, { memo } from "react";
import SvgS from "./components/SvgS";
import Display from "./components/Display";

interface widgetPropsI {
  isWidgetMenu: boolean;
}

const Widget = memo(({ isWidgetMenu }: widgetPropsI) => {
  return (
    <section className="app-section container" aria-label="Виджет">
      <div className="right">
        <div className="phone-container">
          <div className="phone">
            <SvgS />
            <Display isWidgetMenu={isWidgetMenu} />
          </div>
        </div>
      </div>
    </section>
  );
});

export default Widget;
