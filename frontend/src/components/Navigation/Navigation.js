import React from "react";
import "./Navigation.css";

const Navgation = ({ onRouteChange, isSignedIn }) => {
  const changeNav = () => {
    console.log("burger clicked");
    /* const nav = document.querySelector("#nav");
    nav.classList.toggle(".nav-active"); */
  };
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-End" }} id="nav">
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="nav" id="nav">
        <div className="logo">SMARTBrain</div>
        <ul className="nav-links">
          <li onClick={() => onRouteChange("signin")} className="signIn">
            Sign In
          </li>
          <li onClick={() => onRouteChange("register")} className="register">
            Register
          </li>
        </ul>
        {/* <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim black underline pa3 pointer"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p> */}
        <div className="burger" onClick={(e) => changeNav}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    );
  }
};

export default Navgation;
