import React from "react";

function ProgressBar(props) {
  return (
    <>
      <p>Total todos progress : {props.calculateProgress().toFixed(2)}%</p>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${props.calculateProgress()}%` }}
        ></div>
      </div>
    </>
  );
}

export default ProgressBar;
