import { Route, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";

import SkillList from "./skill/SkillList";
import Stunts from "./stunt/Stunts";

import Characters from "./character/Characters";
import CharacterSheet from "./character/sheet/CharacterSheet";
import MainForm from "./character/form/MainForm";
import Types from "./character/types/Types";
import TypeDetail from "./character/types/TypeDetail";

import ApiManager from "../modules/ApiManager"
import { useAuth } from "../hooks/useAuth";

const ApplicationViews = props => {
  const { user } = useAuth();

  // Since the vast majority of components use the static mechanics lists
  // I've 'lifted' these components here, to be shared by all
  const [characterTypeList, setCharacterTypeList] = useState([]);
  const [characterSubTypeList, setCharacterSubTypeList] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [stuntList, setStuntList] = useState([]);

  const getCharacterTypeList = () => {
    return ApiManager.getAll("characterTypes")
      .then(types => types.sort((a,b) => a.name.localeCompare(b.name)))
      .then(setCharacterTypeList);
  }

  const getCharacterSubTypes = () => {
    ApiManager.getAll("characterSubTypes")
      .then(subtypes => subtypes.sort((a,b) => a.name.localeCompare(b.name)))
      .then(setCharacterSubTypeList)
  }

  const getSkillList = () => {
    return ApiManager.getAll("skills")
        .then(skills => skills.sort((a, b) => a.name.localeCompare(b.name)))
        .then(setSkillList)
  }

  const getStuntList = () => {
    ApiManager.getAll("stunts")
      .then(stunts => stunts.sort((a,b) => a.name.localeCompare(b.name)))
      .then(setStuntList)
  }

  useEffect(()=>{
    getCharacterTypeList();
    getCharacterSubTypes();
    getSkillList();
    getStuntList();
  }, [])

  return (
    <>
      {/* -------------------MECHANICS------------------- */}
      <Route path="/skills" render={props => {
        return <SkillList 
          skillList={skillList} 
          {...props}
        />
      }}/>
      <Route path="/stunts" render={props => {
        return <Stunts 
          skillList={skillList} 
          stuntList={stuntList} 
          {...props}
        />
      }}/>
      <Route exact path="/types" render={props => {
        return <Types 
          characterTypeList={characterTypeList}
          characterSubTypeList={characterSubTypeList} 
          {...props}
        />
      }}/>
      <Route path="/types/:subTypeId(\d+)" 
        render={props => {
          return <TypeDetail 
            characterTypeList={characterTypeList}
            characterSubTypeList={characterSubTypeList}
            subTypeId={props.match.params.subTypeId}
            verbose={true}
            {...props}
          />
      }}/>
      {/* -------------------CHARACTER------------------- */}
      {/* TODO: Make root be something other than characters */}
      <Route exact path="/" render={props => {
        return <Characters
          characterTypeList={characterTypeList} 
          characterSubTypeList={characterSubTypeList}
          skillList={skillList}
          stuntList={stuntList}
          {...props}
        />
      }}/>
      <Route exact path="/characters" render={props => {
        return <Characters
          characterTypeList={characterTypeList} 
          characterSubTypeList={characterSubTypeList}
          skillList={skillList}
          stuntList={stuntList}
          {...props}
        />
      }}/>
      <Route
        exact
        path="/characters/:characterId"
        render={props => {
          return <CharacterSheet 
            characterId={props.match.params.characterId}
            characterTypeList={characterTypeList} 
            characterSubTypeList={characterSubTypeList}
            skillList={skillList}
            stuntList={stuntList}
            {...props} 
          />;
        }}
      />
      <Route
        exact
        path="/characters/:characterId/edit"
        render={props => {
          // TODO: this also needs to be the user that made this character
          if (user) {
            return <MainForm
              characterTypeList={characterTypeList} 
              characterSubTypeList={characterSubTypeList}
              skillList={skillList}
              stuntList={stuntList}
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
            characterTypeList={characterTypeList} 
            characterSubTypeList={characterSubTypeList}
            skillList={skillList}
            stuntList={stuntList}
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