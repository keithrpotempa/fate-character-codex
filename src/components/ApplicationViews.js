import { Route, Redirect } from "react-router-dom";
import React from "react";

import SkillList from "./skill/SkillList";

import StuntList from "./stunt/StuntList";

import CharacterList from "./character/CharacterList";
import CharacterSheet from "./character/CharacterSheet";
import CharacterForm from "./character/form/CharacterForm";

import LoginForm from "./user/Login"

const ApplicationViews = props => {
  // TODO: hasUser & setUser
  const hasUser = props.hasUser;
  const setUser = props.setUser;

  return (
    <>
      {/* -------------------MECHANICS------------------- */}
      <Route path="/skills" render={props => {
        return <SkillList {...props}/>
      }}/>
      <Route path="/stunts" render={props => {
        return <StuntList {...props}/>
      }}/>
      {/* -------------------CHARACTER------------------- */}
      <Route exact path="/characters" render={props => {
        return <CharacterList {...props}/>
      }}/>
      <Route 
        path="/characters/new"
        render={props => {
          if (hasUser) {
            return <CharacterForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        exact
        path="/characters/:characterId(\d+)"
        render={props => {
          const characterId = parseInt(props.match.params.characterId);
          return <CharacterSheet characterId={characterId} {...props} />;
        }}
      />
      {/* -------------------USER------------------- */}
      <Route 
        path="/login"
        render={props => {
          return <LoginForm setUser={setUser} {...props} />;
        }}
      />
    </>
  )
}

export default ApplicationViews;