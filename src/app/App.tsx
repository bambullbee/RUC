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
    </>
  );
};

export default App;
