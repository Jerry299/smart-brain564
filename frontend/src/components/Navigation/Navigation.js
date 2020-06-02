import React from "react";
import "./Navigation.css";
import DrawerToggleButton from "./SideDrawer/DrawerToggleButton";

const Navgation = ({ onRouteChange, isSignedIn, drawClickHandler }) => {
  if (isSignedIn) {
    return (
      <header className="toolbar">
        <nav style={{ display: "flex", justifyContent: "flex-End" }} id="nav">
          <p
            className="f3 link dim black underline pa3 pointer"
            onClick={() => onRouteChange("signin")}
          >
            Sign out
          </p>
        </nav>
      </header>
    );
  } else {
    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">SMARTBrain</div>
          <div className="spacer" />
          <ul className="toolbar_navigation_links ">
            <li onClick={() => onRouteChange("signin")} className="signIn">
              Sign In
            </li>
            <li onClick={() => onRouteChange("register")} className="register">
              Register
            </li>
          </ul>
          <div className="toggler">
            <DrawerToggleButton click={drawClickHandler} />
          </div>
        </nav>
      </header>
    );
  }
};

export default Navgation;
