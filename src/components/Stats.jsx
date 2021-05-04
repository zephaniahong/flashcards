import React, { useState } from "react";

const Stats = ({ scoreState, deckLength }) => {
  const scores = scoreState.map((score, index) => {
    let familiarity;
    if (index === 0) {
      familiarity = "bg-danger";
    } else if (index === 1) {
      familiarity = "bg-warning";
    } else if (index === 2) {
      familiarity = "bg-success";
    }
    console.log(`${Math.floor((score / deckLength) * 100)}%`);
    return (
      <div>
        <div className="progress">
          <div
            className={`progress-bar ${familiarity}`}
            role="progressbar"
            style={{
              width: `${Math.floor((score / deckLength) * 100)}%`,
              color: "black",
            }}
          ></div>
        </div>
        {score} / {deckLength}
      </div>
    );
  });

  return (
    <React.Fragment>
      <div>Card:</div>
      <div>{scores}</div>
    </React.Fragment>
  );
};

export default Stats;
