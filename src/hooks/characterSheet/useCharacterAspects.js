import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterAspects = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [characterAspects, setCharacterAspects] = useState(EMPTY_ASPECTS);

  const resetAspects = () => {
    setCharacterAspects(EMPTY_ASPECTS);
  }

  const saveCharacterAspects = (characterId) => {
    const aspectsToSave = [...characterAspects];
    return aspectsToSave.forEach((a) => {
      // This keeps blank aspects from being posted
      if (a.name !== "") {
        a.characterId = characterId;
        return ApiManager.push('characterAspects', a)
      }
    });
  }

  useEffect(()=>{
    // Then we're editing and need to fetch
    const getCharacterAspects = () => {
      return ApiManager.getCharacterAttributes("characterAspects", id)
      .then(setCharacterAspects)
    }
    
    if (id) {
      getCharacterAspects();
      setIsLoading(false);
    }
  }, [id])

  return {
    isLoading,
    setIsLoading,
    characterAspects,
    setCharacterAspects,
    resetAspects,
    saveCharacterAspects,
  }
}

const EMPTY_ASPECT = { name: "", characterId: "", id: "" }

const EMPTY_ASPECTS = [
  {...EMPTY_ASPECT, aspectTypeId: 1},
  {...EMPTY_ASPECT, aspectTypeId: 2},
  {...EMPTY_ASPECT, aspectTypeId: 3},
  {...EMPTY_ASPECT, aspectTypeId: 3},
  {...EMPTY_ASPECT, aspectTypeId: 3},
];