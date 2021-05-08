import axios from "axios";
import React, { useEffect, useState } from "react";

const StudyDecks = ({
  setStudyState,
  updateSelectedDeck,
  updateSession,
  selectedDeck,
  setNumCards,
  setClickedDeck,
  setSelectedDeck,
  setDeckLength,
  clickedDeck,
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
        setSelectedDeck(selectedDeck);
        axios.get(`/deckLength/${selectedDeck}`).then((response) => {
          const { length } = response.data;
          setDeckLength(Math.min(length, num));
        });
      }}
    >
      <span className="dropdown-item">Set of {num}</span>
    </li>
  ));

  // create all the decks in nav tab
  const deckList = decks.map((deck) => {
    let active = "";
    if (clickedDeck === deck.id) {
      active = "active";
    } else {
      active = "";
    }
    return (
      <li
        onClick={(e) => {
          setClickedDeck(deck.id);
        }}
        className={`nav-item ${active}`}
        key={deck.id}
      >
        <a className="nav-link" aria-current="page" href="#">
          {deck.name}
        </a>
      </li>
    );
  });

  // // create all the decks in card form
  // const deckList = decks.map((deck) => (
  //   <div
  //     key={deck.id}
  //     onClick={() => {
  //       setClickedDeck(deck.id);
  //     }}
  //     className="card col-4 h-50"
  //   >
  //     <div className="card-body d-flex align-items-center text-center justify-content-center row">
  //       <h5 className="card-title">{deck.name}</h5>
  //       <div className="dropdown">
  //         <button
  //           className="btn btn-secondary dropdown-toggle"
  //           type="button"
  //           id="dropdownMenuButton1"
  //           data-bs-toggle="dropdown"
  //           aria-expanded="false"
  //           onClick={() => {
  //             updateSelectedDeck(deck.id);
  //           }}
  //         >
  //           Study
  //         </button>
  //         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  //           {listDropDown}
  //         </ul>
  //       </div>
  //     </div>
  //   </div>
  // ));

  // check if deck data has been received
  if (decks.length > 1) {
    return (
      <React.Fragment>
        <ul className="nav nav-tabs">{deckList}</ul>
      </React.Fragment>
    );
  }
  return <div />;
};

export default StudyDecks;
