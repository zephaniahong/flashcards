import axios from "axios";
import React, { useState } from "react";

const FamiliarityButtons = ({
  updateCardCounter,
  updateCardState,
  session,
  cardId,
}) => {
  const handleButtonClick = (index) => {};

  const familiarityButtons = [1, 2, 3].map((num, index) => (
    <button
      className="familiarityButton col btn btn-primary"
      onClick={() => {
        // change card being displayed
        updateCardCounter();
        // change card state to question
        updateCardState();
        // register answer in db
        axios.post(`/sessionCard/${session}/${cardId}/${index + 1}`);
      }}
    >
      {num}
    </button>
  ));
  return <React.Fragment>{familiarityButtons}</React.Fragment>;
};

export default FamiliarityButtons;
