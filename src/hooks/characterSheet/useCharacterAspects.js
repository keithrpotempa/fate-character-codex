import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterAspects = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [characterAspects, setCharacterAspects] = useState(EMPTY_ASPECTS);

  const resetAspects = () => {
    setCharacterAspects(EMPTY_ASPECTS);
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