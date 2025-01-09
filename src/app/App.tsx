import "../style.css";

import Header from "@/widgets/header/index";
import Messanger from "@/widgets/messanger/index";
import Widget from "@/widgets/widget/index";
import GlobalBg from "./glogalBG/components/GlobalBg";
import { useEffect, useState } from "react";
import Banner from "@/entities/Banner/components/Banner";

const App = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isWidgetMenu, setIsWidgetMenu] = useState(false);
  useEffect(() => {
    function resizeHandler() {
      if (
        window.innerWidth > 992 &&
        window.innerWidth / window.innerHeight < 2
      ) {
        setIsWidgetMenu(false);
      }
    }
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
  return (
    <>
      <Header setIsWidgetMenu={setIsWidgetMenu} />
      <main>
        <Messanger isScrolling={isScrolling} setIsScrolling={setIsScrolling} />
        <Widget isWidgetMenu={isWidgetMenu} />
        <button
          className="scroll-prevent-btn"
          style={{
            backgroundColor: isScrolling
              ? "var(--primary-HO-color)"
              : "var(--secondary-HO-color)",
          }}
          onClick={() => {
            setIsScrolling((prevState) => !prevState);
            if (isScrolling) {
              const messangerBlock = document.querySelector(".dialogue-window");
              messangerBlock.scrollTo({
                top: messangerBlock.scrollHeight,
                behavior: "smooth",
              });
            }
          }}
        ></button>
        <Banner isScrolling={isScrolling} />
      </main>
      <GlobalBg />
    </>
  );
};

export default App;
