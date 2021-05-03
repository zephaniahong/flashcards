import React, { useState } from "react";
import Study from "./components/Study.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Summary from "./components/Summary.jsx";

export default function App() {
  // to decide which component to render - dashboard or study
  const [studyState, setStudyState] = useState("");

  // keep track of the deck id which was selected
  const [selectedDeck, setSelectedDeck] = useState(0);

  // note what session it is
  const [session, setSession] = useState(0);

  // keep track of the card to display from the array
  const [cardCounter, setCardCounter] = useState(0);

  //number of cards user wants to study
  const [numCards, setNumCards] = useState(null);

  // deck that user clicked on - to see stats
  const [clickedDeck, setClickedDeck] = useState(null);

  //function to update session
  const updateSession = (session) => {
    setSession(session);
  };

  // function to update study state
  const updateStudyState = (newState) => {
    setStudyState(newState);
  };

  // function to update selected deck
  const updateSelectedDeck = (deckId) => {
    setSelectedDeck(deckId);
  };
  if (studyState === "") {
    return (
      <div className="row">
        <DashBoard
          updateStudyState={updateStudyState}
          updateSelectedDeck={updateSelectedDeck}
          updateSession={updateSession}
          selectedDeck={selectedDeck}
          setNumCards={setNumCards}
          setClickedDeck={setClickedDeck}
          clickedDeck={clickedDeck}
        />
      </div>
    );
  } else if (studyState !== "") {
    if (cardCounter + 1 <= numCards) {
      // display cards
      return (
        <div>
          <Study
            selectedDeck={selectedDeck}
            session={session}
            numCards={numCards}
            setCardCounter={setCardCounter}
            cardCounter={cardCounter}
          />
        </div>
      );
    } else {
      // display summary component
      return (
        <div>
          <Summary selectedDeck={selectedDeck} session={session} />
        </div>
      );
    }
  }
  return null;
}
