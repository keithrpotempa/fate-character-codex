import { Route, Redirect } from "react-router-dom";
import React from "react";

import SkillList from "./skill/SkillList";
import Stunts from "./stunt/Stunts";

import Characters from "./character/Characters";
import CharacterSheet from "./character/sheet/CharacterSheet";
import CharacterForm from "./character/form/CharacterForm";
import MainForm from "./character/form/MainForm";
import TypeList from "./character/types/TypeList";
import TypeDetail from "./character/types/TypeDetail";

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
        return <Stunts {...props}/>
      }}/>
      <Route exact path="/types" render={props => {
        return <TypeList {...props}/>
      }}/>
      <Route path="/types/:subTypeId(\d+)" 
        render={props => {
          return <TypeDetail 
            subTypeId={props.match.params.subTypeId}
            verbose={true}
            {...props}
          />
      }}/>
      {/* -------------------CHARACTER------------------- */}
      {/* TODO: Make root be something other than characters */}
      <Route exact path="/" render={props => {
        return <Characters {...props}/>
      }}/>
      <Route exact path="/characters" render={props => {
        return <Characters {...props}/>
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
      {/* "hidden" views to show the way the form used to work */}
      <Route
        path="/characters/oldnew"
        render={props => {
          if (hasUser) {
            return <CharacterForm {...props} />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route
        path="/characters/:characterId(\d+)/oldedit"
        render={props => {
          // TODO: this also needs to be the user that made this character
          if (hasUser) {
            return <CharacterForm {...props} />;
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