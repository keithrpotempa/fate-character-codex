import { Route, Redirect } from "react-router-dom";
import React from "react";

import SkillList from "./skill/SkillList";
import StuntList from "./stunt/StuntList";

import CharacterList from "./character/CharacterList";
import CharacterSheet from "./character/sheet/CharacterSheet";
// import CharacterForm from "./character/form/CharacterForm";
import MainForm from "./character/form/MainForm";

import Login from "./user/Login"
import Register from "./user/Register"

const ApplicationViews = props => {
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
      {/* TODO: Make root be something other than characters */}
      <Route exact path="/" render={props => {
        return <CharacterList {...props}/>
      }}/>
      <Route exact path="/characters" render={props => {
        return <CharacterList {...props}/>
      }}/>
      <Route 
        path="/characters/new"
        render={props => {
          if (hasUser) {
            return <MainForm {...props} />;
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
      <Route
        path="/characters/:characterId(\d+)/edit"
        render={props => {
          // TODO: this also needs to be the user that made this character
          if (hasUser) {
            return <MainForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      {/* -------------------USER------------------- */}
      <Route 
        path="/login"
        render={props => {
          return <Login setUser={setUser} {...props} />;
        }}
      />
      <Route 
        path="/register"
        render={props => {
          return <Register setUser={setUser} {...props} />;
        }}
      />
    </>
  )
}

export default ApplicationViews;