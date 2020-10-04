import React, { useState } from "react";
import AppDrawer from "./drawer/drawer";
import AppHeader from "./appHeader/appHeader";

const AppNavigation = (props) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <AppHeader isMenuOpen={isMenuOpen} toggleDrawerFunction={toggleDrawer} />
      <AppDrawer
        isMenuOpen={isMenuOpen}
        toggleDrawerFunction={toggleDrawer}
        handleFormSubmit={props.handleFormSubmit}
      />
    </>
  );
};

export default AppNavigation;
