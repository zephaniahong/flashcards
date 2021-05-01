import React, { useState } from "react";

const Stats = () => {
  return (
    <React.Fragment>
      <div>Card:</div>
      <div>
        <div className="score no-idea">0</div>
        <div className="score okay">0</div>
        <div className="score perfect">0</div>
      </div>
    </React.Fragment>
  );
};

export default Stats;
