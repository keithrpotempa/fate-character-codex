import React, { useState, useEffect, useContext, createContext } from "react";
import ApiManager from "../modules/ApiManager";

const fateRulesContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideFateRules({ children }) {
  const auth = useProvideFateRules();
  return <fateRulesContext.Provider value={auth}>{children}</fateRulesContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useFateRules = () => {
  return useContext(fateRulesContext);
};

// Retrieves and provides all the static character information and rules
const useProvideFateRules = () => {
  const [characterTypes, setCharacterTypes] = useState([]);
  const [characterSubTypes, setCharacterSubTypes] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [stuntList, setStuntList] = useState([]);

  const getCharacterTypeList = () => {
    return ApiManager.getAll("characterTypes")
      .then(setCharacterTypes)
  }

  const getCharacterSubTypeList = () => {
    return ApiManager.getAll("characterSubTypes")
      .then(setCharacterSubTypes)
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

  useEffect(() => {
    getCharacterTypeList();
    getCharacterSubTypeList();
    getSkillList();
    getStuntList();
  }, [])

  return {
    characterTypes,
    characterSubTypes,
    skillList,
    stuntList,
  }
}