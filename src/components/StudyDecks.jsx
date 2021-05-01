import axios from "axios";
import React, { useEffect, useState } from "react";

const StudyDecks = ({
  updateStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
}) => {
  const [decks, setDecks] = useState([]);
  const [numCards, setNumCards] = useState(null);
  // create new session
  const createSession = (deckId) => {
    axios.post(`/createSession/${deckId}`).then((response) => {
      updateSession(response.data.session.id);
    });
    updateStudyState("study");
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
      onClick={() => {
        setNumCards(num);
        createSession(selectedDeck);
      }}
    >
      <a className="dropdown-item" href="#">
        {num}
      </a>
    </li>
  ));

  // create all the decks in card form
  const deckList = decks.map((deck) => (
    <div className="card" style={{ width: "12rem" }}>
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
            Dropdown button
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
    return <div className="row">{deckList}</div>;
  }
  return <div />;
};

export default StudyDecks;
