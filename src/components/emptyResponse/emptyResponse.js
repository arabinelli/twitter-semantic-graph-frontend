import React from "react";
import "./emptyResponse.css";

const EmptyResponse = () => {
  return (
    <div className="error">
      <div className="text">
        <h1>👻</h1>
        <h3>Oh, wow! You've found an hashtag with...</h3>
        <h4>Zero Tweets!!!</h4>
        <p>Try again with a different one.</p>
        <p>(Also, consider that the API only looks back at the past 7 days!)</p>
      </div>
    </div>
  );
};

export default EmptyResponse;
