import axios from "axios";
import React, { useState, useEffect } from "react";
import FamiliarityButtons from "./FamiliarityButtons.jsx";

const FlashCard = ({ selectedDeck, session, updateScoreState }) => {
  const [deck, setDeck] = useState();
  const [cardCounter, setCardCounter] = useState(0);
  const [cardState, setCardState] = useState("question");
  const updateCardCounter = () => {
    setCardCounter(cardCounter + 1);
  };

  // function to update card state to question
  const updateCardState = () => {
    setCardState("question");
  };

  // set deck state after user chooses deck
  useEffect(() => {
    if (selectedDeck !== 0) {
      axios.get(`/deck/${selectedDeck}`).then((response) => {
        setDeck(response.data.cards);
      });
    }
  }, []);

  if (deck) {
    let card;
    // show question or answer
    if (cardState === "question") {
      card = <p>{deck[cardCounter].question}</p>;
    } else {
      card = <p>{deck[cardCounter].answer}</p>;
    }
    return (
      <React.Fragment>
        <div
          onClick={() => {
            const state = cardState === "question" ? "answer" : "question";
            setCardState(state);
          }}
          className="card"
        >
          {card}
        </div>
        <div className="familiarityButtonGroup row">
          <FamiliarityButtons
            updateScoreState={updateScoreState}
            cardId={deck[cardCounter].id}
            session={session}
            updateCardCounter={updateCardCounter}
            updateCardState={updateCardState}
          />
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default FlashCard;
