import { Route } from "react-router-dom";
import React from "react";

import SkillList from "./skill/SkillList";

import StuntList from "./stunt/StuntList";

import CharacterList from "./character/CharacterList";
import CharacterSheet from "./character/CharacterSheet";

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
      <Route exact path="/characters" render={props => {
        return <CharacterList {...props}/>
      }}/>
      <Route
        exact
        path="/characters/:characterId(\d+)"
        render={props => {
          const characterId = parseInt(props.match.params.characterId);
          return <CharacterSheet characterId={characterId} {...props} />;
        }}
      />
    </>
  )
}

export default ApplicationViews;