import React from "react";
import { CookieBanner } from "@palmabit/react-cookie-law";

const CookieConsentBanner = (props) => {
  return (
    <CookieBanner
      message={
        "This website is a non-profit personal project, however it uses own as well as third-party cookies in order to " +
        "understand how this tool is used and optimize the user experience. " +
        "You can here accept or decline the use of non-essential cookies, and learn more about them in the privacy policy."
      }
      policyLink="/privacy"
      showPreferencesOption={false}
      showMarketingOption={false}
      onAccept={props.handleCookieAcceptance}
      styles={{
        dialog: {
          position: "fixed",
          bottom: "0",
          left: "0",
          right: "0",
          zIndex: "100000",
          backgroundColor: "#f8f7f7",
          padding: "10px",
        },
        checkbox: {
          position: "absolute",
          top: "0",
          left: "0",
          width: "14",
          height: "14",
          zIndex: "2",
          cursor: "pointer",
        },
      }}
    />
  );
};

export default CookieConsentBanner;
