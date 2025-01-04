import React from "react";
import "../style.css";
import { Suspense } from "react";

import { Outlet, Link } from "react-router-dom";

import FlowerPng from "@/assets/flower.png";
import FlowerJpeg from "@/assets/flower.jpeg";
import FlowerJpg from "@/assets/flower.jpg";
import FlowerSvg from "@/assets/flower.svg";

const App = () => {
  return (
    <>
      <div data-testid={"App.testid"}>App</div>
      <h1 className="text-red-500 text-3xl">Text</h1>
      <div>
        <img width={200} height={100} src={FlowerPng} alt="flower" />
        <img width={200} height={100} src={FlowerJpeg} alt="flower" />
        <img width={200} height={100} src={FlowerJpg} alt="flower" />
      </div>
      <div>
        <FlowerSvg width="20px" height="20px" />
      </div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/shop">Shop</Link>

      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
