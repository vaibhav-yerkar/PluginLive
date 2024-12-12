import React from "react";

import Navbar from "../components/Navbar";

const DefaultHOC =
  (Component) =>
  ({ ...props }) => {
    return (
      <>
        <Navbar />
        <Component {...props} />
      </>
    );
  };

export default DefaultHOC;
