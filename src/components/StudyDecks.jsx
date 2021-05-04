import axios from "axios";
import React, { useEffect, useState } from "react";

const StudyDecks = ({
  setStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
  setClickedDeck,
}) => {
  const [decks, setDecks] = useState([]);
  // create new session
  const createSession = (deckId) => {
    axios.post(`/createSession/${deckId}`).then((response) => {
      updateSession(response.data.session.id);
    });
  };

  // get deck data only once OR whenever there is a change
  useEffect(() => {
    axios.get("/studyDecks").then((response) => {
      const deckArray = response.data;
      setDecks(deckArray);
    });
  }, []);

  const listDropDown = [5, 10, 15].map((num) => (
    <li
      key={num}
      onClick={() => {
        setNumCards(num);
        createSession(selectedDeck);
        setStudyState("study");
        console.log("updating study state to study");
      }}
    >
      <a className="dropdown-item" href="">
        {num}
      </a>
    </li>
  ));

  // create all the decks in card form
  const deckList = decks.map((deck) => (
    <div
      key={deck.id}
      onClick={() => {
        setClickedDeck(deck.id);
      }}
      className="card col-4"
    >
      <div className="card-body">
        <h5 className="card-title">{deck.name}</h5>
        <p className="card-text">Some quick example text</p>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => {
              updateSelectedDeck(deck.id);
            }}
          >
            Study
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {listDropDown}
          </ul>
        </div>
      </div>
    </div>
  ));

  // check if deck data has been received
  if (decks.length > 1) {
    return <React.Fragment>{deckList}</React.Fragment>;
  }
  return <div />;
};

export default StudyDecks;
