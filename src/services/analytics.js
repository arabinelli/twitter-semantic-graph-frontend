import React from "react";
import ReactGA, { ga } from "react-ga";
import Cookies from "js-cookie";

const trackUsage = () => {
  ReactGA.initialize("UA-123384350-2");
  ReactGA.set({ anonymizeIp: true });

  let gaConsent = Cookies.get("rcl_statistics_consent");
  console.log(gaConsent);

  if (gaConsent) {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
};

export default trackUsage;
