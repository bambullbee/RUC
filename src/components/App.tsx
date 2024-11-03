import React from "react";
import { Suspense } from "react";

import classes from "../App.module.css";
import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className={classes.main}>App</div>
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
