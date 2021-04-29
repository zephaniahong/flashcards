import React, { useState } from "react";
import FlashCard from "./components/FlashCard.jsx";
import DashBoard from "./components/DashBoard.jsx";
export default function App() {
  // to decide which component to render - dashboard or study
  const [studyState, setStudyState] = useState("");

  // keep track of the deck id which was selected
  const [selectedDeck, setSelectedDeck] = useState("");

  // function to update study state
  const updateStudyState = (newState) => {
    setStudyState(newState);
  };

  // function to update selected deck
  const updateSelectedDeck = (deckId) => {
    setSelectedDeck(deckId);
  };
  return (
    <div>
      <DashBoard
        updateStudyState={updateStudyState}
        studyState={studyState}
        updateSelectedDeck={updateSelectedDeck}
      />
    </div>
  );
}
