import { Route } from "react-router-dom";
import React from "react";

import SkillList from "./skill/SkillList";

import StuntList from "./stunt/StuntList";

const ApplicationViews = props => {
  // TODO: hasUser & setUser

  return (
    <>
      <Route path="/skills" render={props => {
        return <SkillList {...props}/>
      }}/>
      <Route path="/stunts" render={props => {
        return <StuntList {...props}/>
      }}/>
    </>
  )
}

export default ApplicationViews;