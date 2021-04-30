import axios from "axios";
import React, { useState, useEffect } from "react";
import FamiliarityButtons from "./FamiliarityButtons.jsx";

const FlashCard = ({ selectedDeck }) => {
  const [deck, setDeck] = useState();
  const [cardCounter, setCardCounter] = useState(0);

  const updateCardCounter = () => {
    setCardCounter(cardCounter + 1);
  };
  useEffect(() => {
    if (selectedDeck !== 0) {
      axios.get(`/deck/${selectedDeck}`).then((response) => {
        setDeck(response.data.cards);
      });
    }
  }, []);
  if (deck) {
    return (
      <div>
        <div className="question">{deck[cardCounter].question}</div>
        <div className="familiarityButtonGroup row">
          <FamiliarityButtons updateCardCounter={updateCardCounter} />
        </div>
      </div>
    );
  }
  return null;
};

export default FlashCard;
