import React, { useState } from "react";

const FamiliarityButtons = ({ updateCardCounter, updateCardState }) => {
  document.onkeydown = (e) => {
    if (e.code === "Digit1" || e.code === "Digit2" || e.code === "Digit3") {
      // change card being displayed
      updateCardCounter();
      updateCardState();

      // register answer in db
    }
  };
  const familiarityButtons = [1, 2, 3].map((num) => (
    <div className="familiarityButton col">{num}</div>
  ));
  return <React.Fragment>{familiarityButtons}</React.Fragment>;
};

export default FamiliarityButtons;
