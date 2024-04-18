/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./Home";
import AboutComponent from "./About";
// import SignIn from "./SignIn";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const MainApp = () => {
  const [activeComponent, setActiveComponent] = useState("home");

  const handleNavClick = (component: any) => {
    setActiveComponent(component);
  };
  return (
    <>
      <nav>
        <button onClick={() => handleNavClick("home")}>Home</button>
        <button onClick={() => handleNavClick("about")}>About</button>
      </nav>
      {activeComponent === "home" && <HomeComponent />}
      {activeComponent === "about" && <AboutComponent />}
    </>
  );
};

export default MainApp;
