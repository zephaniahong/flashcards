import axios from "axios";
import React, { useState, useEffect } from "react";
import FamiliarityButtons from "./FamiliarityButtons.jsx";
import PriorityQueue from "../priorityQueue";
const FlashCard = ({
  selectedDeck,
  session,
  updateScoreState,
  numCards,
  setCardCounter,
  cardCounter,
  clickedDeck,
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
    if (selectedDeck !== 0) {
      axios.get(`/deck/${selectedDeck}`).then((response) => {
        const dbDeck = response.data.cards;
        let newDeck = [];
        for (let i = 0; i < dbDeck.length; i += 1) {
          newDeck.push([dbDeck[i], 0]);
        }
        // get all session_cards of a deck by a user
        axios.get(`/allSessionCards/${selectedDeck}`).then((response2) => {
          const allSessionCards = response2.data;
          for (let i = 0; i < newDeck.length; i += 1) {
            for (let j = 0; j < allSessionCards.length; j += 1) {
              if (allSessionCards[j].cardId === newDeck[i][0].id) {
                // compare familiarity
                if (allSessionCards[j].familiarity > newDeck[i][1]) {
                  newDeck[i][1] = allSessionCards[j].familiarity;
                }
              }
            }
          }
          for (let i = 0; i < newDeck.length; i += 1) {
            srDeck.enqueue(newDeck[i]);
          }
          console.log(srDeck.collection());
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
