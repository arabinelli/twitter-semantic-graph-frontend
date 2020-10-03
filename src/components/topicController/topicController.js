import React, { useState } from "react";
import "./topicController.css";

const TopicController = (props) => {
  return props.showExtendedTopics ? (
    <div className="topic-controller">
      <div id="topic-controller-head">
        <div id="number-of-topics">
          <p>{props.communities.length} topics have been found!</p>
        </div>
        <div id="topic-controller-close" onClick={props.handleButtonClick}>
          Close
        </div>
      </div>

      <div id="topic-controller-body">
        <div id="previous" onClick={props.handlePreviousCommunity}>
          {"<< Prev"}
        </div>
        <div id="topic-selected">
          {props.selectedCommunity === ""
            ? "No topic selected"
            : "Topic " + String(props.selectedCommunity + 1)}
        </div>
        <div id="next" onClick={props.handleNextCommunity}>
          {"Next >>"}
        </div>
      </div>
    </div>
  ) : (
    <div
      id="show-topics-button"
      className="topic-controller"
      onClick={props.handleButtonClick}
    >
      Click here to explore the topics
    </div>
  );
};

export default TopicController;
