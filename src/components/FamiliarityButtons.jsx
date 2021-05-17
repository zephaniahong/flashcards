import axios from "axios";
import React, { useState } from "react";

const FamiliarityButtons = ({
  updateCardState,
  session,
  cardId,
  updateScoreState,
  setCardCounter,
  cardCounter,
}) => {
  const familiarityButtons = [1, 2, 3].map((num, index) => {
    // determine color of button
    let color;
    if (index === 0) {
      color = "btn-danger";
    } else if (index === 1) {
      color = "btn-warning";
    } else {
      color = "btn-success";
    }
    return (
      <button
        className={`familiarityButton col btn ${color}`}
        onClick={() => {
          // change card being displayed
          setCardCounter(cardCounter + 1);
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
  return <>{familiarityButtons}</>;
};

export default FamiliarityButtons;
