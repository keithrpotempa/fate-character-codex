import React from "react";
import { Route, Redirect } from "react-router-dom";

import SkillList from "./skill/SkillList";
import Stunts from "./stunt/Stunts";

import Characters from "./character/Characters";
import CharacterSheet from "./character/sheet/CharacterSheet";
import MainForm from "./character/form/MainForm";
import Types from "./character/types/Types";
import TypeDetail from "./character/types/TypeDetail";

import { useAuth } from "../hooks/useAuth";

const ApplicationViews = props => {
  const { user } = useAuth();

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
        return <Types {...props}/>
      }}/>
      <Route path="/types/:subTypeId(\d+)" 
        render={props => {
          return <TypeDetail 
            subTypeId={parseInt(props.match.params.subTypeId)}
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
        exact
        path="/characters/:characterId"
        render={props => {
          return <CharacterSheet characterId={props.match.params.characterId} {...props} />;
        }}
      />
      <Route
        exact
        path="/characters/:characterId/edit"
        render={props => {
          // TODO: this also needs to be the user that made this character
          if (user) {
            return <MainForm
              characterId={props.match.params.characterId}
              {...props} 
            />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
      <Route 
        exact
        path="/new-character"
        render={props => {
          if (user) {
            return <MainForm 
            characterId={props.match.params.characterId}
            {...props} 
          />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </>
  )
}

export default ApplicationViews;