import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";
import Mastery from "./Mastery.jsx";
import UserInfo from "./UserInfo.jsx";

const DashBoard = ({
  updateStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
  setClickedDeck,
  clickedDeck,
}) => {
  return (
    <React.Fragment>
      <div className="col-4">
        <UserInfo />
      </div>
      <div className="col-8">
        <Mastery clickedDeck={clickedDeck} />
      </div>
      <div>
        <StudyDecks
          updateStudyState={updateStudyState}
          updateSelectedDeck={updateSelectedDeck}
          updateSession={updateSession}
          selectedDeck={selectedDeck}
          setNumCards={setNumCards}
          setClickedDeck={setClickedDeck}
        />
      </div>
    </React.Fragment>
  );
};
export default DashBoard;
