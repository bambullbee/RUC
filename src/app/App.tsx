import "../style.css";

import Header from "@/widgets/header/index";
import Messanger from "@/widgets/messanger/index";
import Widget from "@/widgets/widget/index";
import GlobalBg from "./glogalBG/components/GlobalBg";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Messanger />
        <Widget />
      </main>
      <GlobalBg />
      <button
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          background: "red",
          color: "black",
          zIndex: 4,
        }}
        onClick={() => {
          const block = document.querySelector<HTMLElement>(".dialogue-window");
          block.scrollTop = block.scrollHeight;
        }}
      >
        Press me
      </button>
    </>
  );
};

export default App;
