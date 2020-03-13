import React from "react";
import ApplicationViews from "./ApplicationViews";
import NavBar from "./nav/NavBar";

const CharacterCodex = () => {
  // TODO: user auth

  return (
    <>
      <NavBar />
      <ApplicationViews />
    </>
  );
}

export default CharacterCodex;