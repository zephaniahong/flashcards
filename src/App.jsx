import React, { useState } from "react";
import Study from "./components/Study.jsx";
import DashBoard from "./components/DashBoard.jsx";

export default function App() {
  // to decide which component to render - dashboard or study
  const [studyState, setStudyState] = useState("");

  // keep track of the deck id which was selected
  const [selectedDeck, setSelectedDeck] = useState(0);

  // note what session it is
  const [session, setSession] = useState(0);

  //function to update session
  const updateSession = (session) => {
    setSession(session);
  };

  //number of cards user wants to study
  const [numCards, setNumCards] = useState(null);

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
      <div>
        <DashBoard
          updateStudyState={updateStudyState}
          updateSelectedDeck={updateSelectedDeck}
          updateSession={updateSession}
          selectedDeck={selectedDeck}
          setNumCards={setNumCards}
        />
      </div>
    );
  }
  return (
    <div>
      <Study selectedDeck={selectedDeck} session={session} />
    </div>
  );
}
