import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterBasics = (id, characterSubTypes, user) => {
  const [isLoading, setIsLoading] = useState(false);
  const [character, setCharacter] = useState(EMPTY_CHARACTER);
  const [characterType, setCharacterType] = useState(null);

  const characterSubType = character?.characterSubTypeId;

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

  const saveCharacterBasics = () => {
    const characterToSave = {...character}; 
    characterToSave.characterSubTypeId = parseInt(characterToSave.characterSubTypeId);
    characterToSave.modified = new Date().toLocaleString();
    
    // Then we're creating a new character
    if (!id) {
      characterToSave.created = new Date().toLocaleString();
    }
    setCharacter(characterToSave);
    // NOTE: at this point, the character's reference on firebase already exists (getKey)
    // we are just updating it with all the information (whether saving or editing)
    return ApiManager.update("characters", characterToSave.id, characterToSave);
  };

  useEffect(()=>{
    setIsLoading(true);
    const getCharacter = () => {
      return ApiManager.get("characters", id)
        .then(character => {
          const subType = characterSubTypes.find((st) => st.id === parseInt(character.characterSubTypeId));
          setCharacterType(subType.characterTypeId);
          setCharacter(character);
          setIsLoading(false);
        });
    }
    
    // Then we're editing, we've already retrieved the characterSubTypes, 
    // and we need to fetch the specific character
    if (characterSubTypes.length > 0 && id) {
      getCharacter();
    } else {
      const newState = {...EMPTY_CHARACTER}
      // Then we're making a new character, 
      // so we get a key from firebase
      newState.id = ApiManager.getKey("characters");
      // and set the active user as the userid on the character
      newState.userId = user ? user.uid : "";
      setCharacter(newState);
    }
  }, [id, characterSubTypes, user]);

  return {
    isLoading,
    setIsLoading,
    character,
    setCharacterName,
    characterType,
    setCharacterType,
    characterSubType,
    setCharacterSubType,
    saveCharacterBasics,
  }
};

const EMPTY_CHARACTER = { name: "", userId: "", characterSubTypeId: "", created: "", id: "", modified: "" }
