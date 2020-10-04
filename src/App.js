import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Route, Switch } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/appHeader/appHeader";
import AppDrawer from "./components/drawer/drawer";
import fetchGraphData from "./services/fetchBaseData";
import MainScreen from "./mainScreen";
import ErrorScreen from "./components/errorScreen/errorScreen";
import NotFound from "./components/notFound/notFound";
import PrivacyPolicy from "./components/privacyPolicy/privacyPolicy";
import trackUsage from "./services/analytics";

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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dataHasLoaded, setDataLoaded] = useState(false);
  const [thisLocation, setThisLocation] = useState("");
  // const [selectedCommunity, setSelectedCommunity] = useState("");

  const [inputedHashtag, setInputedHashtag] = useState("");
  const [inputedLanguage, setInputedLanguage] = useState("");
  const [hasError, setError] = useGlobal("hasError");

  const classes = useStyles();
  let location = useLocation("/");
  let history = useHistory();

  useEffect(() => {
    trackUsage();
  }, [location]);

  useEffect(() => {
    setThisLocation(location);
  }, [location]);

  const toggleDrawer = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleFormSubmit = async (event, values) => {
    console.log(values);
    setDataLoaded(false);
    event.preventDefault();
    setFormIsSubmitted(true);
    toggleDrawer();
    setInputedHashtag(
      values.hashtags.split(" ").map((item) => {
        return item.startsWith("#")
          ? item.replaceAll("\n", "")
          : "#" + item.replaceAll("\n", "");
      })
    );
    setInputedLanguage(values.language);
    let data = await fetchGraphData(
      values.hashtags.split(" ").map((item) => {
        return item.startsWith("#")
          ? item.replaceAll("\n", "")
          : "#" + item.replaceAll("\n", "");
      }),
      language,
      setError
    ).then((data) => {
      return data;
    });
    setGraphData(data);
    setDataLoaded(true);
  };

  return (
    <div className={classes.root}>
      <AppHeader isMenuOpen={isMenuOpen} toggleDrawerFunction={toggleDrawer} />
      <AppDrawer
        isMenuOpen={isMenuOpen}
        toggleDrawerFunction={toggleDrawer}
        handleFormSubmit={handleFormSubmit}
      />
      {hasError ? (
        <ErrorScreen />
      ) : (
        <>
          <Switch
            location={
              thisLocation.pathname === "/privacy"
                ? { pathname: "/" }
                : thisLocation
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
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>

          {thisLocation.pathname === "/privacy" && (
            <Route path="/privacy" component={() => <PrivacyPolicy />} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
