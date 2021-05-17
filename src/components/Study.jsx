import React, { useState, useEffect } from "react";
import FlashCard from "./FlashCard.jsx";
import Stats from "./Stats.jsx";

const Study = ({
  selectedDeck,
  session,
  numCards,
  setCardCounter,
  cardCounter,
  deckLength,
  clickedDeck,
}) => {
  const [scoreState, setScoreState] = useState([0, 0, 0]);

  const updateScoreState = (index) => {
    scoreState[index] += 1;
    setScoreState([...scoreState]);
  };
  return (
    <div className="row">
      <div className="col-3 stats">
        <Stats scoreState={scoreState} deckLength={deckLength} />
      </div>
      <div className="col-9">
        <FlashCard
          clickedDeck={clickedDeck}
          selectedDeck={selectedDeck}
          session={session}
          updateScoreState={updateScoreState}
          numCards={numCards}
          setCardCounter={setCardCounter}
          cardCounter={cardCounter}
        />
      </div>
    </div>
  );
};

export default Study;
