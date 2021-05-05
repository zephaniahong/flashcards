import axios from "axios";
import React, { useEffect, useState } from "react";

const Summary = ({
  selectedDeck,
  session,
  numCards,
  setStudyState,
  setCardCounter,
  setNumCards,
}) => {
  const [noIdea, setNoIdea] = useState(0);
  const [okay, setOkay] = useState(0);
  const [perfect, setPerfect] = useState(0);
  useEffect(() => {
    // get stats info of the latest session
    axios.get(`/sessionInfo/${session}`).then((response) => {
      let red = 0;
      let orange = 0;
      let green = 0;
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i].familiarity === 1) {
          red += 1;
        } else if (response.data[i].familiarity === 2) {
          orange += 1;
        } else if (response.data[i].familiarity === 3) {
          green += 1;
        }
      }
      setNoIdea(red);
      setOkay(orange);
      setPerfect(green);
    });
  }, []);

  return (
    <React.Fragment>
      <p>Congratulations on studying {numCards} cards!</p>
      <p>Here is a summary: </p>
      <div className="bg-danger score">{noIdea}</div>
      <div className="bg-warning score">{okay}</div>
      <div className="bg-success score">{perfect}</div>
      <div>
        <button
          className="btn mt-2"
          onClick={() => {
            setStudyState("");
            setCardCounter(0);
            setNumCards(0);
          }}
        >
          Back to Dashboard
        </button>
      </div>
    </React.Fragment>
  );
};

export default Summary;
