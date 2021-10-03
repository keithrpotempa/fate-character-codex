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
  const [isLoading, setIsLoading] = useState(false);
  const [characterTypes, setCharacterTypes] = useState([]);
  const [characterSubTypes, setCharacterSubTypes] = useState([]);
  const [characterSubTypesByType, setCharacterSubTypesByType] = useState({});
  const [skillList, setSkillList] = useState([]);
  const [stuntList, setStuntList] = useState([]);

  const getCharacterTypeList = () => {
    return ApiManager.getAll("characterTypes")
      .then(setCharacterTypes)
  }

  const getCharacterSubTypeList = () => {
    return ApiManager.getAll("characterSubTypes")
      .then((subtypes) => {
        getSubTypesByType(subtypes);
        setCharacterSubTypes(subtypes);
      })
  }

  const getSubTypesByType = subtypes => {
    const newSubTypesByType = {};
    subtypes.forEach(st => {
      const typeId = st.characterTypeId
      if(newSubTypesByType.hasOwnProperty(typeId)){
        newSubTypesByType[typeId].push(st.id) 
      } else {
        newSubTypesByType[typeId] = [st.id] 
      }
    });
    setCharacterSubTypesByType(newSubTypesByType);
  }

  const getSkillList = () => {
    return ApiManager.getAll("skills")
        .then(skills => skills.sort((a, b) => a.name.localeCompare(b.name)))
        .then(setSkillList)
  }

  const getStuntList = () => {
    return ApiManager.getAll("stunts")
      .then(stunts => stunts.sort((a,b) => a.name.localeCompare(b.name)))
      .then(setStuntList)
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getCharacterTypeList(),
      getCharacterSubTypeList(),
      getSkillList(),
      getStuntList(),
    ]).then(setIsLoading(false))
  }, [])

  return {
    isLoading,
    characterTypes,
    characterSubTypes,
    characterSubTypesByType,
    skillList,
    stuntList,
  }
}