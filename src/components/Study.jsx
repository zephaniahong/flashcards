import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard.jsx";

const Study = ({ selectedDeck }) => {
  return (
    <div>
      <FlashCard selectedDeck={selectedDeck} />
    </div>
  );
};

export default Study;
