import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">{`${name}, Your Current Rank is .......`}</div>
      <div className="f1 white">{`${entries}`}</div>
    </div>
  );
};

export default Rank;
