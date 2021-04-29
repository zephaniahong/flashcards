import React, { useState } from "react";
import Study from "./components/Study.jsx";
import DashBoard from "./components/DashBoard.jsx";

export default function App() {
  // to decide which component to render - dashboard or study
  const [studyState, setStudyState] = useState("");

  // keep track of the deck id which was selected
  const [selectedDeck, setSelectedDeck] = useState(0);

  // function to update study state
  const updateStudyState = (newState) => {
    setStudyState(newState);
  };

  // function to update selected deck
  const updateSelectedDeck = (deckId) => {
    setSelectedDeck(deckId);
  };
  if (selectedDeck === 0) {
    return (
      <div>
        <DashBoard
          updateStudyState={updateStudyState}
          updateSelectedDeck={updateSelectedDeck}
        />
      </div>
    );
  }
  return (
    <div>
      <Study selectedDeck={selectedDeck} />
    </div>
  );
}
