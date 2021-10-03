import { useState, useEffect } from "react";
import { confirmAlert } from 'react-confirm-alert';
import ApiManager from "../modules/ApiManager";

export const useCharacterList = () => {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ characters, setCharacters ] = useState([]);
  const [ highConcepts, setHighConcepts ] = useState([]);

  const getCharacters = () => {
    return ApiManager.getAll("characters")
    .then(ApiManager.arrayify)
      /* Sorting characters alphabetically
        https://stackoverflow.com/a/45544166*/
      .then(characters => characters.sort((a,b) => a.name.localeCompare(b.name)))
      .then(setCharacters)
  };

  const getHighConcepts = () => {
    return ApiManager.getAll("characterAspects")
      .then(ApiManager.arrayify)
      .then((aspects) => aspects.filter((a) => a.aspectTypeId === 0))
      .then(setHighConcepts)
  };

  // FIXME
  const deleteCharacter = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
          .then(getCharacters)
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getCharacters(),
      getHighConcepts(),
    ]).then(setIsLoading(false))
  }, [])

  return {
    characters,
    highConcepts,
    deleteCharacter,
    isLoading,
  }
}