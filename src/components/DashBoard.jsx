import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";
import Mastery from "./Mastery.jsx";

const DashBoard = ({
  updateStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
  setClickedDeck,
  clickedDeck,
}) => {
  console.log(clickedDeck);
  return (
    <div>
      <Mastery clickedDeck={clickedDeck} />
      <StudyDecks
        updateStudyState={updateStudyState}
        updateSelectedDeck={updateSelectedDeck}
        updateSession={updateSession}
        selectedDeck={selectedDeck}
        setNumCards={setNumCards}
        setClickedDeck={setClickedDeck}
      />
    </div>
  );
};
export default DashBoard;
