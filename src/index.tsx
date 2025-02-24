import { createRoot } from "react-dom/client";
import "./style.css";
import { Provider } from "react-redux";

import { store } from "./app/store";
import App from "./app/App";

// document
//   .querySelector("meta[name=viewport]")
//   .setAttribute(
//     "content",
//     "width=device-width, user-scalable=no, initial-scale=" +
//       1 / window.devicePixelRatio +
//       ""
//   );

import applyTheme from "./theme";

applyTheme();

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(
  <Provider store={store}>
    <App />
  </Provider>
);
