import React from "react";
import "./graphTitle.css";

const GraphTitle = (props) => {
  return (
    <div className="graph-title">
      <p>{"Graph for " + props.hashtag}</p>
    </div>
  );
};

export default GraphTitle;
