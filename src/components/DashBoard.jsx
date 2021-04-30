import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";

const DashBoard = ({ updateStudyState, updateSelectedDeck, updateSession }) => (
  <div>
    <StudyDecks
      updateStudyState={updateStudyState}
      updateSelectedDeck={updateSelectedDeck}
      updateSession={updateSession}
    />
  </div>
);

export default DashBoard;
