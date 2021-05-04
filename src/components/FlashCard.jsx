import axios from "axios";
import React, { useState, useEffect } from "react";
import FamiliarityButtons from "./FamiliarityButtons.jsx";

const FlashCard = ({
  selectedDeck,
  session,
  updateScoreState,
  numCards,
  setCardCounter,
  cardCounter,
}) => {
  const [deck, setDeck] = useState();
  const [cardState, setCardState] = useState("question");

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
    // show cards while it is less than the number of cards chosen by user
    return (
      <React.Fragment>
        <div
          onClick={() => {
            // toggle between question and answer
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
            cardCounter={cardCounter}
            setCardCounter={setCardCounter}
            updateCardState={updateCardState}
          />
        </div>
      </React.Fragment>
    );
  }
  return null;
};

export default FlashCard;
