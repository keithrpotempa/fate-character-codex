import { Route } from "react-router-dom";
import React from "react";

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