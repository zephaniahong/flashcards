import axios from "axios";
import React, { useState } from "react";

const FamiliarityButtons = ({
  updateCardCounter,
  updateCardState,
  session,
  cardId,
  updateScoreState,
}) => {
  const familiarityButtons = [1, 2, 3].map((num, index) => {
    // determine color of button
    let color;
    if (index === 0) {
      color = "no-idea";
    } else if (index === 1) {
      color = "okay";
    } else {
      color = "perfect";
    }
    return (
      <button
        className={`familiarityButton col btn btn-primary ${color}`}
        onClick={() => {
          // change card being displayed
          updateCardCounter();
          // change card state to question
          updateCardState();
          // update score state in stats bar
          updateScoreState(index);
          // register answer in db
          axios.post(`/sessionCard/${session}/${cardId}/${index + 1}`);
        }}
      >
        {num}
      </button>
    );
  });
  return <React.Fragment>{familiarityButtons}</React.Fragment>;
};

export default FamiliarityButtons;
