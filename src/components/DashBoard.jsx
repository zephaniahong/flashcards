import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";

const DashBoard = ({
  updateStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
}) => (
  <div>
    <StudyDecks
      updateStudyState={updateStudyState}
      updateSelectedDeck={updateSelectedDeck}
      updateSession={updateSession}
      selectedDeck={selectedDeck}
      setNumCards={setNumCards}
    />
  </div>
);

export default DashBoard;
