import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterBasics = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(EMPTY_CHARACTER);
  const [characterType, setCharacterType] = useState({});
  const [characterSubType, setCharacterSubType] = useState({});

  useEffect(()=>{
    // Then we're editing and need to fetch
    const getCharacter = () => {
      return ApiManager.get("characters", id)
      .then(character => {
        setCharacter(character)
        ApiManager.get("characterSubTypes", character.characterSubTypeId)
        .then(setCharacterSubType)
      });
    }
    
    if (id) {
      getCharacter();
    }
  }, [id]);

  return {
    isLoading,
    setIsLoading,
    character,
    setCharacter,
    characterType,
    setCharacterType,
    characterSubType,
    setCharacterSubType,
  }
};

const EMPTY_CHARACTER = { name: "", userId: "", characterSubTypeId: "", created: "", id: "", modified: "" }
