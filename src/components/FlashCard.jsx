import axios from "axios";
import React, { useState, useEffect } from "react";
import FamiliarityButtons from "./FamiliarityButtons.jsx";
import PriorityQueue from "../priorityQueue";

const FlashCard = ({
  clickedDeck,
  session,
  updateScoreState,
  setCardCounter,
  cardCounter,
}) => {
  const [deck, setDeck] = useState(null);
  const [cardState, setCardState] = useState("question");

  // function to update card state to question
  const updateCardState = () => {
    setCardState("question");
  };

  // set deck state after user chooses deck
  useEffect(() => {
    const srDeck = new PriorityQueue();
    if (clickedDeck !== 0) {
      axios.get(`/deck/${clickedDeck}`).then((response) => {
        const dbDeck = response.data.cards;
        let newDeck = [];
        for (let i = 0; i < dbDeck.length; i += 1) {
          newDeck.push([dbDeck[i], 0]);
        }
        // get all session_cards of a deck by a user
        axios.get(`/allSessionCards/${clickedDeck}`).then((response2) => {
          const allSessionCards = response2.data;
          for (let i = 0; i < newDeck.length; i += 1) {
            for (let j = allSessionCards.length - 1; j >= 0; j -= 1) {
              if (allSessionCards[j].cardId === newDeck[i][0].id) {
                newDeck[i][1] = allSessionCards[j].familiarity;
                break;
              }
            }
          }
          for (let i = 0; i < newDeck.length; i += 1) {
            srDeck.enqueue(newDeck[i]);
          }
          setDeck(srDeck.collection());
        });
      });
    }
  }, []);

  if (deck) {
    let card;
    // show question or answer
    if (cardState === "question") {
      card = <p>{deck[cardCounter][0].question}</p>;
    } else {
      card = <p>{deck[cardCounter][0].answer}</p>;
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
            cardId={deck[cardCounter][0].id}
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
