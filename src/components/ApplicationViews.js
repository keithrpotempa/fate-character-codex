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
        <Route path="/skills" render={props => {
          return <SkillList {...props}/>
        }}/>,
        <Route path="/stunts" render={props => {
          return <Stunts {...props}/>
        }}/>,
        <Route exact path="/types" render={props => {
          return <Types {...props}/>
        }}/>,
        <Route path="/types/:subTypeId(\d+)" 
          render={props => {
            return <TypeDetail 
              subTypeId={parseInt(props.match.params.subTypeId)}
              verbose={true}
              {...props}
            />
        }}/>,
        <Route exact path="/" render={props => {
          return <Characters {...props}/>
        }}/>,
        <Route exact path="/characters" render={props => {
          return <Characters {...props}/>
        }}/>,
        <Route
          exact
          path="/characters/:characterId"
          render={props => {
            return <CharacterSheet characterId={props.match.params.characterId} {...props} />;
          }}
        />,
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
              return <Redirect to="/" />;
            }
          }}
        />,
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