import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";

const DashBoard = ({ updateStudyState, studyState, updateSelectedDeck }) => (
  <div>
    <StudyDecks
      updateStudyState={updateStudyState}
      studyState={studyState}
      updateSelectedDeck={updateSelectedDeck}
    />
  </div>
);

export default DashBoard;
