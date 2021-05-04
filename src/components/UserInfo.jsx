import axios from "axios";
import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [username, setUserName] = useState();
  const [cardCount, setCardCount] = useState();
  axios.get("/userInfo").then((response) => {
    setCardCount(response.data.cardCount);
    setUserName(response.data.user.name);
  });
  return (
    <React.Fragment>
      <p>{username}</p>
      <p>Total Cards Studied: {cardCount} </p>
    </React.Fragment>
  );
};

export default UserInfo;
