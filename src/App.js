import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/appHeader/appHeader";
import AppDrawer from "./components/drawer/drawer";
import fetchGraphData from "./services/fetchBaseData";
import MainScreen from "./mainScreen";
import ErrorScreen from "./components/errorScreen/errorScreen";
import NotFound from "./components/notFound/notFound";
import PrivacyPolicy from "./components/privacyPolicy/privacyPolicy";

import { useGlobal, setGlobal } from "reactn";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

setGlobal({
  inputedHashtag: "",
  inputedLanguage: "",
  hasError: false,
});

function App() {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [graphData, setGraphData] = useState({
    graph_data: { nodes: [], links: [] },
    communities: [],
  });
  const [typedHashtag, setTypedHashtag] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("");
  const [dataHasLoaded, setDataLoaded] = useState(false);
  // const [selectedCommunity, setSelectedCommunity] = useState("");

  const [inputedHashtag, setInputedHashtag] = useGlobal("inputedHashtag");
  const [inputedLanguage, setInputedLanguage] = useGlobal("inputedLanguage");
  const [hasError, setError] = useGlobal("hasError");

  const classes = useStyles();

  const toggleDrawer = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLanguageChoice = (event) => {
    setLanguage(event.target.value);
  };

  const handleHashtagChange = (event) => {
    setTypedHashtag(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    setDataLoaded(false);
    event.preventDefault();
    setFormIsSubmitted(true);
    toggleDrawer();
    setInputedHashtag(
      typedHashtag.split(" ").map((item) => {
        return item.startsWith("#")
          ? item.replaceAll("\n", "")
          : "#" + item.replaceAll("\n", "");
      })
    );
    setInputedLanguage(language);
    let data = await fetchGraphData(
      typedHashtag.split(" ").map((item) => {
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
        typedHashtag={typedHashtag}
        handleHashtagChange={handleHashtagChange}
        language={language}
        handleLanguageChoice={handleLanguageChoice}
      />
      {hasError ? (
        <ErrorScreen />
      ) : (
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <MainScreen
                dataHasLoaded={dataHasLoaded}
                formIsSubmitted={formIsSubmitted}
                graphData={graphData.graph_data}
                communities={graphData.communities}
              />
            )}
          />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route component={NotFound} />
        </Switch>
      )}
    </div>
  );
}

export default App;
