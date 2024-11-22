import { createRoot } from "react-dom/client";
import "./style.css";

import App from "./components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LazyAbout } from "./pages/About/About.lazy";
import { LazyShop } from "./pages/Shop/Shop.lazy";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/about", element: <LazyAbout /> },
      { path: "/shop", element: <LazyShop /> },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
