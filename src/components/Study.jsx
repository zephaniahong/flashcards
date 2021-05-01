import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard.jsx";
import Stats from "./Stats.jsx";

const Study = ({ selectedDeck, session }) => {
  const [scoreState, setScoreState] = useState([0, 0, 0]);
  return (
    <div className="row">
      <div className="col-3">
        <Stats scoreState={scoreState} />
      </div>
      <div className="col-9">
        <FlashCard selectedDeck={selectedDeck} session={session} />
      </div>
    </div>
  );
};

export default Study;
