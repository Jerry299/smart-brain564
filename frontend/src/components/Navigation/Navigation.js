import React from "react";

const Navgation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-End" }}>
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
      <nav style={{ display: "flex", justifyContent: "flex-End" }}>
        <p
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
        </p>
      </nav>
    );
  }
};

export default Navgation;
