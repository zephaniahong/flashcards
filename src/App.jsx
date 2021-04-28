import React, { useState } from "react";
import StudyDecks from "./components/StudyDecks.jsx";
import FlashCard from "./components/FlashCard.jsx";
export default function App() {
  const [studyState, setStudyState] = useState("");

  // function to update study state
  const updateState = (newState) => {
    setStudyState(newState);
  };
  return (
    <div>
      <StudyDecks updateState={updateState} studyState={studyState} />
    </div>
  );
}
