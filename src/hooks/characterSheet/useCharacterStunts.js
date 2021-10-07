import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterStunts = (id, stuntList) => {
  const [isLoading, setIsLoading] = useState(false);

  const [characterStunts, setCharacterStunts] = useState(EMPTY_STUNTS);

  const resetStunts = () => {
    setCharacterStunts(EMPTY_STUNTS);
  }

  const saveCharacterStunts = (characterId) => {
    // Why are these objects again?
    for (const row in characterStunts) {
      // Only build and post if there's 
      // actually a stunt selected on that row
      if (characterStunts[row]) {
        const stuntId = characterStunts[row]
        const stuntToSave = {
          characterId: characterId,
          stuntId: parseInt(stuntId)
        }
        ApiManager.push("characterStunts", stuntToSave)
      }
    }  
  }

  useEffect(()=>{
    const getCharacterStunts = () => {
      ApiManager.getCharacterAttributes("characterStunts", id)
        .then((characterStuntObjs) => setCharacterStunts(characterStuntObjs.map((cs) => cs.stuntId)))
    }
    if (id) {
      getCharacterStunts();
    };
  },[id, stuntList]);

  return {
    isLoading,
    setIsLoading,
    characterStunts,
    setCharacterStunts,
    resetStunts,
    saveCharacterStunts,
  }
};

// An array of stuntIds
const EMPTY_STUNTS = [];