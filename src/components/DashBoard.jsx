import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";

const DashBoard = ({ updateStudyState, updateSelectedDeck }) => (
  <div>
    <StudyDecks
      updateStudyState={updateStudyState}
      updateSelectedDeck={updateSelectedDeck}
    />
  </div>
);

export default DashBoard;
