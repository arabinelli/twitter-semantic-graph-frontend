import React from "react";
import "./tweetCard.css";

const TweetCard = (props) => {
  const formatDate = (dateString) => {
    let date = new Date(dateString);
    let minutes =
      date.getMinutes() < 10
        ? +"0" + String(date.getMinutes())
        : date.getMinutes();
    return date.toDateString() + " at " + date.getHours() + ":" + minutes;
  };

  const formatFavoritesRetweets = (favoriteCount, retweetCount) => {
    let favoriteOrFavorites = "❤️"; //favoriteCount !== 1 ? "Favorites" : "Favorite";
    let retweetOrRetweets = "🔁"; //retweetCount !== 1 ? "Retweets" : "Retweet";
    return (
      String(favoriteCount) +
      " " +
      favoriteOrFavorites +
      "  " +
      String(retweetCount) +
      " " +
      retweetOrRetweets
    );
  };

  return (
    <>
      <div className="card">
        <p className="account-name">{props.accountName}</p>
        <p className="user-handle">{props.accountHandle}</p>
        <p className="tweet">{props.tweet}</p>
        <p className="datetime">{formatDate(props.datetime)}</p>
        <p className="stats">
          {formatFavoritesRetweets(props.favoriteCount, props.retweetCount)}
        </p>
      </div>
    </>
  );
};

export default TweetCard;
