import React, { useState } from "react";

const Stats = ({ scoreState }) => {
  const scores = scoreState.map((score, index) => {
    if (index === 0) {
      return <div className="score no-idea">{score}</div>;
    } else if (index === 1) {
      return <div className="score okay">{score}</div>;
    } else {
      return <div className="score perfect">{score}</div>;
    }
  });

  return (
    <React.Fragment>
      <div>Card:</div>
      <div>{scores}</div>
    </React.Fragment>
  );
};

export default Stats;
