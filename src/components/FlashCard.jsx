import axios from "axios";
import React, { useState, useEffect } from "react";

const FlashCard = () => {
  axios.get("/deck").then((response) => {
    console.log(response.data);
  });
  return <div></div>;
};

export default FlashCard;
