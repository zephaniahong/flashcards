import React, { useState, useEffect } from "react";
import StudyDecks from "./StudyDecks.jsx";

const DashBoard = ({ updateStudyState, studyState }) => {
  return (
    <div>
      <StudyDecks updateStudyState={updateStudyState} studyState={studyState} />
    </div>
  );
};

export default DashBoard;
