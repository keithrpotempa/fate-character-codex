import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterBasics = (id, characterSubTypes) => {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(EMPTY_CHARACTER);
  const [characterType, setCharacterType] = useState(null);

  const characterSubType = character.characterSubTypeId;

  const setCharacterName = (newName) => {
    const newCharacter = {...character};
    newCharacter['name'] = newName;
    setCharacter(newCharacter);
  }

  const setCharacterSubType = (newId) => {
    const newCharacter = {...character};
    newCharacter['characterSubTypeId'] = newId;
    setCharacter(newCharacter);
  }

  useEffect(()=>{
    const getCharacter = () => {
      return ApiManager.get("characters", id)
      .then(character => {
        const subType = characterSubTypes.find((st) => st.id === character.characterSubTypeId);
        setCharacterType(subType.characterTypeId);
        setCharacter(character);
      });
    }
    
    // Then we're editing and need to fetch
    if (id) {
      getCharacter();
    }
  }, [id, characterSubTypes]);

  return {
    isLoading,
    setIsLoading,
    character,
    setCharacterName,
    characterType,
    setCharacterType,
    characterSubType,
    setCharacterSubType,
  }
};

const EMPTY_CHARACTER = { name: "", userId: "", characterSubTypeId: "", created: "", id: "", modified: "" }
