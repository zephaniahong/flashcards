import axios from "axios";
import React, { useEffect, useState } from "react";

const Mastery = ({ clickedDeck }) => {
  const [percentMastery, setPercentMastery] = useState(0);

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
  );
};

export default Mastery;
