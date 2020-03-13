import { Route, Redirect } from "react-router-dom";
import React from "react";
import Home from "./home/Home";

import SkillList from "./skill/SkillList"

const ApplicationViews = props => {
  // TODO: hasUser & setUser

  return (
    <>
      <Route path="/skills" render={props => {
        return <SkillList {...props}/>
      }}/>
    </>
  )
}

export default ApplicationViews;