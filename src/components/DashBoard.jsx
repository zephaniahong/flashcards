import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";
import Mastery from "./Mastery.jsx";
import UserInfo from "./UserInfo.jsx";

const DashBoard = ({
  setStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
  setClickedDeck,
  clickedDeck,
  setSelectedDeck,
  setDeckLength,
}) => {
  const [decks, setDecks] = useState([]);
  return (
    <React.Fragment>
      <div className="row">
        <StudyDecks
          setStudyState={setStudyState}
          updateSelectedDeck={updateSelectedDeck}
          updateSession={updateSession}
          selectedDeck={selectedDeck}
          setNumCards={setNumCards}
          setClickedDeck={setClickedDeck}
          setSelectedDeck={setSelectedDeck}
          setDeckLength={setDeckLength}
          clickedDeck={clickedDeck}
          setDecks={setDecks}
          decks={decks}
        />
      </div>
      <div className="row pb-2">
        <div className="userInfo">
          <UserInfo />
          <Mastery
            clickedDeck={clickedDeck}
            setStudyState={setStudyState}
            updateSelectedDeck={updateSelectedDeck}
            updateSession={updateSession}
            selectedDeck={selectedDeck}
            setNumCards={setNumCards}
            setClickedDeck={setClickedDeck}
            setSelectedDeck={setSelectedDeck}
            setDeckLength={setDeckLength}
            decks={decks}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default DashBoard;
