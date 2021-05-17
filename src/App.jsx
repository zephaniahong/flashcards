import React, { useState } from "react";
import Study from "./components/Study.jsx";
import DashBoard from "./components/DashBoard.jsx";
import Summary from "./components/Summary.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  // to decide which component to render - dashboard or study
  const [studyState, setStudyState] = useState("");

  // note what session it is
  const [session, setSession] = useState(0);

  // keep track of the card to display from the array
  const [cardCounter, setCardCounter] = useState(0);

  //number of cards user wants to study
  const [numCards, setNumCards] = useState(null);

  // deck that user clicked on - to see stats
  const [clickedDeck, setClickedDeck] = useState(null);

  // deck length
  const [deckLength, setDeckLength] = useState(0);

  if (studyState === "") {
    return (
      <div className="row">
        <Navbar setStudyState={setStudyState} />
        <div className="">
          <DashBoard
            setStudyState={setStudyState}
            setSession={setSession}
            setNumCards={setNumCards}
            setClickedDeck={setClickedDeck}
            clickedDeck={clickedDeck}
            setDeckLength={setDeckLength}
          />
        </div>
      </div>
    );
  } else if (studyState === "study") {
    if (cardCounter + 1 <= numCards) {
      // display cards
      return (
        <div>
          <Navbar setStudyState={setStudyState} />
          <div>
            <Study
              session={session}
              numCards={numCards}
              setCardCounter={setCardCounter}
              cardCounter={cardCounter}
              deckLength={deckLength}
              clickedDeck={clickedDeck}
            />
          </div>
        </div>
      );
    } else {
      // display summary component
      return (
        <div>
          <Navbar className="row" setStudyState={setStudyState} />
          <div className="summary row">
            <Summary
              session={session}
              setNumCards={setNumCards}
              setCardCounter={setCardCounter}
              numCards={numCards}
              setStudyState={setStudyState}
            />
          </div>
        </div>
      );
    }
  }
  return;
}
