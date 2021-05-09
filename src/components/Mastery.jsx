import axios from "axios";
import React, { useEffect, useState } from "react";

const Mastery = ({
  setStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
  setClickedDeck,
  setSelectedDeck,
  setDeckLength,
  clickedDeck,
  setDecks,
  decks,
}) => {
  // create new session
  const createSession = (deckId) => {
    axios.post(`/createSession/${deckId}`).then((response) => {
      updateSession(response.data.session.id);
    });
  };
  const [percentMastery, setPercentMastery] = useState(0);

  const StudyButton = () => {
    if (clickedDeck >= 1) {
      return (
        <div className="text-center">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => {
              updateSelectedDeck(decks);
            }}
          >
            Study
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {listDropDown}
          </ul>
        </div>
      );
    }
    return null;
  };
  const listDropDown = [5, 10, 15].map((num) => (
    <li
      key={num}
      onClick={() => {
        setNumCards(num);
        createSession(clickedDeck);
        setStudyState("study");
        setSelectedDeck(clickedDeck);
        axios.get(`/deckLength/${clickedDeck}`).then((response) => {
          const { length } = response.data;
          setDeckLength(Math.min(length, num));
        });
      }}
    >
      <span className="dropdown-item">Set of {num}</span>
    </li>
  ));
  // get all sessions for a single deck
  if (clickedDeck !== null) {
    axios.get(`/allSessions/${clickedDeck}`).then((response) => {
      const mastery = response.data;
      let count = 0;
      // count how many 3's there are in mastery
      for (const key in mastery) {
        if (mastery[key] === 3) {
          count += 1;
        }
      }
      // get length of deck
      axios.get(`/deckLength/${clickedDeck}`).then((response2) => {
        const { length } = response2.data;
        setPercentMastery(Math.round((count / length) * 100));
      });
    });
  }

  return (
    <div>
      <div className="contain">
        <div className="car">
          <div className="box">
            <div className="percent">
              <svg>
                <circle cx="70" cy="70" r="70" />
                <circle
                  style={{
                    strokeDashoffset: `calc(440 - (440 * ${percentMastery}) / 100)`,
                  }}
                  cx="70"
                  cy="70"
                  r="70"
                />
              </svg>
              <div className="number">
                <h2>
                  {percentMastery}
                  <span>%</span>
                </h2>
              </div>
            </div>
            <h2 className="text">Mastery</h2>
          </div>
        </div>
      </div>
      <StudyButton />
    </div>
  );
};

export default Mastery;
