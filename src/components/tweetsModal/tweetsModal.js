import React from "react";
import "./tweetsModal.css";
import TweetCard from "./tweetCard/tweetCard";
import { Ring } from "react-spinners-css";
// import { Tweet } from "react-twitter-widgets";

const TweetModal = (props) => {
  const showHideClassName = props.isModalOpen
    ? "tweet-modal display-block"
    : "tweet-modal display-none";

  return (
    <>
      <div className={showHideClassName} onClick={props.handleBackgroundClick}>
        {props.hasDataLoaded ? (
          <div
            className="tweet-modal-main"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="tweet-modal-main header">
              <p className="modal-header">
                Tweets for '{props.selectedHashtag}'
              </p>
            </div>
            <div className="tweet-modal-main body">
              {props.tweets.map((item) => {
                return (
                  // <Tweet
                  //   tweetId={item.key}
                  //   options={{ width: "inherit" }}
                  // />
                  <TweetCard
                    accountName={item.username}
                    accountHandle={item.twitter_handle}
                    tweet={item.text}
                    datetime={item.datetime}
                    retweetCount={item.retweet_count}
                    favoriteCount={item.favorite_count}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="loading-tweets">
            <Ring color="#a8dadc" size={50} />
          </div>
        )}
      </div>
    </>
  );
};

export default TweetModal;
