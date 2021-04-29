import axios from "axios";
import React, { useState, useEffect } from "react";

const FlashCard = ({ selectedDeck }) => {
  const [cards, setCards] = useState();

  useEffect(() => {
    if (selectedDeck !== 0) {
      axios.get(`/deck/${selectedDeck}`).then((response) => {
        console.log(response.data.cards);
        setCards([response.data.cards[0]]);
      });
    }
  }, []);
  if (cards) {
    return <div className="question">{cards[0].question}</div>;
  }
  return null;
};

export default FlashCard;
