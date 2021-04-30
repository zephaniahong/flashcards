import React, { useState } from "react";

const FamiliarityButtons = () => {
  document.onkeydown = (e) => {
    console.log(e.code);
  };
  const familiarityButtons = [1, 2, 3].map((num) => (
    <div className="familiarityButton col">{num}</div>
  ));
  return <React.Fragment>{familiarityButtons}</React.Fragment>;
};

export default FamiliarityButtons;
