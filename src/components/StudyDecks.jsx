/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
import axios from "axios";
import React, { useEffect } from "react";

const StudyDecks = ({ setClickedDeck, clickedDeck, setDecks, decks }) => {
  // get deck data only once OR whenever there is a change
  useEffect(() => {
    axios.get("/studyDecks").then((response) => {
      const deckArray = response.data;
      setDecks(deckArray);
    });
  }, []);

  // create all the decks in nav tab
  const deckList = decks.map((deck) => (
    // let active = "";
    // if (clickedDeck === deck.id) {
    //   active = "active";
    // } else {
    //   active = "";
    // }
    <li className="nav-item" key={deck.id}>
      <span
        className="nav-link"
        onClick={() => {
          setClickedDeck(deck.id);
        }}
      >
        {deck.name}
      </span>
    </li>
  ));

  if (decks.length > 1) {
    return (
      <React.Fragment>
        <ul className="nav nav-tabs">{deckList}</ul>
      </React.Fragment>
    );
  }
  return null;
};

export default StudyDecks;
