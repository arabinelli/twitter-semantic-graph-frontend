import React, { useState, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavigation from "./components/appNavigation/appNavigation";
import fetchGraphData from "./services/fetchBaseData";
import MainScreen from "./mainScreen";
import ErrorScreen from "./components/errorScreen/errorScreen";
import EmptyResponse from "./components/emptyResponse/emptyResponse";
import NotFound from "./components/notFound/notFound";
import PrivacyPolicy from "./components/privacyPolicy/privacyPolicy";
import trackUsage from "./services/analytics";
import preprocessHashtags from "./utils/preprocessHashtags";
import Cookies from "js-cookie";

import { useGlobal, setGlobal } from "reactn";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

setGlobal({
  hasError: false,
});

function App() {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [graphData, setGraphData] = useState({
    graph_data: { nodes: [], links: [] },
    communities: [],
  });
  const [dataHasLoaded, setDataLoaded] = useState(false);
  const [cookiesAccepted, setcookiesAccepted] = useState(
    Cookies.get("rcl_statistics_consent") ? true : false
  );

  const [inputedHashtag, setInputedHashtag] = useState("");
  const [inputedLanguage, setInputedLanguage] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [hasError, setError] = useGlobal("hasError");

  const classes = useStyles();
  let location = useLocation("/");

  useEffect(() => {
    trackUsage();
  }, [location, cookiesAccepted]);

  const handleCookieAcceptance = () => {
    setcookiesAccepted(true);
  };

  const handleFormSubmit = async (event, values) => {
    setDataLoaded(false);
    setError(false);
    setIsEmpty(false);
    event.preventDefault();
    setFormIsSubmitted(true);
    setInputedHashtag(preprocessHashtags(values.hashtags));
    setInputedLanguage(values.language);
    let data = await fetchGraphData(
      preprocessHashtags(values.hashtags),
      values.language,
      setError,
      setIsEmpty
    ).then((data) => {
      return data;
    });
    setGraphData(data);
    setDataLoaded(true);
  };

  return (
    <div className={classes.root}>
      <AppNavigation handleFormSubmit={handleFormSubmit} />
      {hasError | isEmpty ? (
        isEmpty ? (
          <EmptyResponse />
        ) : (
          <ErrorScreen />
        )
      ) : (
        <>
          <Switch
            location={
              location.pathname === "/privacy" ? { pathname: "/" } : location
            }
          >
            <Route
              exact
              path="/"
              component={() => (
                <MainScreen
                  dataHasLoaded={dataHasLoaded}
                  formIsSubmitted={formIsSubmitted}
                  graphData={graphData.graph_data}
                  communities={graphData.communities}
                  inputedHashtag={inputedHashtag}
                  inputedLanguage={inputedLanguage}
                  handleCookieAcceptance={handleCookieAcceptance}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>

          {location.pathname === "/privacy" && (
            <Route path="/privacy" component={() => <PrivacyPolicy />} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
