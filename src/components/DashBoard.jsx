import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";

const DashBoard = ({
  updateStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
}) => (
  <div>
    <StudyDecks
      updateStudyState={updateStudyState}
      updateSelectedDeck={updateSelectedDeck}
      updateSession={updateSession}
      selectedDeck={selectedDeck}
    />
  </div>
);

export default DashBoard;
