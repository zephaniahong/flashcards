import axios from "axios";
import React, { useEffect, useState } from "react";

const StudyDecks = ({ updateStudyState, studyState }) => {
  const [decks, setDecks] = useState([]);

  // create new session
  const createSession = (deckId) => {
    axios.post(`/createSession/${deckId}`);
    updateStudyState("study");
  };

  // get deck data only once OR whenever there is a change
  useEffect(() => {
    axios.get("/studyDecks").then((response) => {
      const deckArray = response.data;
      setDecks(deckArray);
    });
  }, []);

  // create all the decks in card form
  let deckList;
  if (studyState === "") {
    deckList = decks.map((deck) => (
      <div className="card" style={{ width: "12rem" }}>
        <div className="card-body">
          <h5 className="card-title">{deck.name}</h5>
          <p className="card-text">Some quick example text</p>
          <button
            type="button"
            onClick={() => createSession(deck.id)}
            className="btn btn-primary"
          >
            Study
          </button>
        </div>
      </div>
    ));
  }

  // check if deck data has been received
  if (decks.length > 1) {
    return <div className="row">{deckList}</div>;
  }
  return <div />;
};

export default StudyDecks;
