import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div>
      <h3>{error ? JSON.stringify(error + "!!!!!") : null}</h3>
    </div>
  );
};

export default ErrorMessage;
