import axios from "axios";
import React, { useEffect, useState } from "react";

const Mastery = ({ clickedDeck }) => {
  // get all sessions for a single deck
  if (clickedDeck !== null) {
    axios.get(`/allSessions/${clickedDeck}`).then((response) => {
      const mastery = response.data;
      // get length of deck
      axios.get(`/deckLength/${clickedDeck}`).then((response) => {
        console.log(response.data);
      });
    });
  }

  return (
    <div className="contain">
      <div className="car">
        <div className="box">
          <div className="percent">
            <svg>
              <circle cx="70" cy="70" r="70"></circle>
              <circle cx="70" cy="70" r="70"></circle>
            </svg>
            <div className="number">
              <h2>
                90<span>%</span>
              </h2>
            </div>
          </div>
          <h2 className="text">Mastery</h2>
        </div>
      </div>
    </div>
  );
};

export default Mastery;
