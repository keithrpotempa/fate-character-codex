import { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";

export const useCharacterStunts = (id, stuntList) => {
  const [isLoading, setIsLoading] = useState(false);

  const [characterStunts, setCharacterStunts] = useState(EMPTY_STUNTS);

  const resetStunts = () => {
    setCharacterStunts(EMPTY_STUNTS);
  }

  useEffect(()=>{
    const getCharacterStunts = () => {
      ApiManager.getCharacterAttributes("characterStunts", id)
        .then(stunts => {
          let formattedStunts = [];
          // To keep this from crashing if stuntList hasn't loaded yet...
          if (stuntList.length > 0) {
            // Map a new array with the actual names of the stunts,
            // found by matching the fk id from characterStunts and the stunt list
            formattedStunts = stunts.map(stunt => stuntList[stunt.stuntId])
          }
          setCharacterStunts(formattedStunts)
        });
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
  }
};

const EMPTY_STUNTS = {
  5: "",
  4: "",
  3: "",
  2: "",
  1: ""
}