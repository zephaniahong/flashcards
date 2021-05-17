import React, { useState } from "react";
import StudyDecks from "./StudyDecks.jsx";
import Mastery from "./Mastery.jsx";
import UserInfo from "./UserInfo.jsx";

const DashBoard = ({
  setStudyState,
  setSession,
  setNumCards,
  setClickedDeck,
  clickedDeck,
  setDeckLength,
}) => {
  const [decks, setDecks] = useState([]);
  return (
    <React.Fragment>
      <div className="row">
        <StudyDecks
          setClickedDeck={setClickedDeck}
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
            setSession={setSession}
            setNumCards={setNumCards}
            setClickedDeck={setClickedDeck}
            setDeckLength={setDeckLength}
            decks={decks}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default DashBoard;
