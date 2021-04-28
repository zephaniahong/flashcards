import axios from "axios";
import React, { useEffect, useState } from "react";

const StudyDecks = () => {
  const [decks, setDecks] = useState([]);

  // get deck data only once OR whenever there is a change
  useEffect(() => {
    axios.get("/studyDecks").then((response) => {
      const deckArray = response.data;
      setDecks(deckArray);
    });
  }, []);

  // create all the decks in card form
  const deckList = decks.map((deck) => (
    <div className="card" style={{ width: "12rem" }}>
      <div class="card-body">
        <h5 class="card-title">{deck.name}</h5>
        <p class="card-text">Some quick example text</p>
        <button class="btn btn-primary">Study</button>
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
