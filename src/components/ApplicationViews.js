import React from "react";
import { Route, Redirect } from "react-router-dom";

import { Loader } from "semantic-ui-react";

import SkillList from "./pages/SkillList";
import Stunts from "./pages/Stunts";

import Characters from "./pages/Characters";
import CharacterSheet from "./pages/CharacterSheet";
import MainForm from "./pages/MainForm";
import Types from "./pages/Types";
import TypeDetail from "./pages/TypeDetail";

import { useAuth } from "../hooks/useAuth";
import { useFateRules } from "../hooks/useFateRules";

const ApplicationViews = props => {
  const { user } = useAuth();
  const { isLoading: rulesLoading } = useFateRules();

  const isLoading = rulesLoading;

  if (isLoading) {
    return <Loader active inline='centered' />
  }

  return (
    <>
      {/* -------------------MECHANICS------------------- */}
      {[
        <Route key="skills" path="/skills" render={props => {
          return <SkillList {...props}/>
        }}/>,
        <Route key="stunts" path="/stunts" render={props => {
          return <Stunts {...props}/>
        }}/>,
        <Route exact key="types" path="/types" render={props => {
          return <Types {...props}/>
        }}/>,
        <Route key="type-detail" path="/types/:subTypeId(\d+)" 
          render={props => {
            return <TypeDetail 
              subTypeId={parseInt(props.match.params.subTypeId)}
              verbose={true}
              {...props}
            />
        }}/>,
        <Route exact key="home" path="/" render={props => {
          return <Characters {...props}/>
        }}/>,
        <Route exact key="characters" path="/characters" render={props => {
          return <Characters {...props}/>
        }}/>,
        <Route
          key="character-detail"  
          exact
          path="/characters/:characterId"
          render={props => {
            return <CharacterSheet characterId={props.match.params.characterId} {...props} />;
          }}
        />,
        <Route
          key="character-edit"
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
              return <Redirect to="/" />;
            }
          }}
        />,
        <Route
          key="new-character"
          exact
          path="/new-character"
          render={props => {
            if (user) {
              return <MainForm 
              characterId={props.match.params.characterId}
              {...props} 
            />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        />,
      ].map((route) => {
        if (isLoading) {
          return <Loader active inline='centered' />
        }
          return route;
      })}
    </>
  )
}

export default ApplicationViews;