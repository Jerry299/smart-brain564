import React from "react";
import "./Drawer.css";

const DrawerToggleBuuon = (props) => {
  return (
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button__line"></div>
      <div className="toggle-button__line"></div>
      <div className="toggle-button__line"></div>
    </button>
  );
};

export default DrawerToggleBuuon;
