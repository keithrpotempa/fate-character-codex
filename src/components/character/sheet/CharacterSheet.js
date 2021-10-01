import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ApiManager from "../../../modules/ApiManager";
import CharacterSheetMunger from "./CharacterSheetMunger"

// This parent component (of all character sheet components) 
// gets some initial data necessary to render a character sheet, 
// and passes it on to the munger to organize and format

// It is used by the character sheet view (detail route)
// but not in the review stage of the character creation process

// TODO: possibly can be merged back with munger 
// now that skill list and stunt list have been lifted 

const CharacterSheet = ({
  skillList,
  stuntList,
  characterId,
  history,
}) => {
  
  const [character, setCharacter] = useState({});
  const [characterSubType, setCharacterSubType] = useState({});
  // FIXME: what's going on here? Are we not setting character aspects?
  // const [characterAspects, setCharacterAspects] = useState([]);
  const [characterAspects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const activeUser = JSON.parse(sessionStorage.getItem("credentials"));
  const id = characterId;

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
            .then(history.push("/characters"))
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  useEffect(()=>{
    const getCharacter = () => {
      return ApiManager.get("characters", id)
        .then(character => {
          setCharacter(character)
          ApiManager.get("characterSubTypes", character.characterSubTypeId)
            .then(setCharacterSubType)
        });
    }
  
    // FIXME: not setting character aspects?
    const getCharacterAspects = () => {
      return ApiManager.getCharacterAttributes("characterAspects", id)
    }

    getCharacter();
    getCharacterAspects();
    setIsLoading(false);
  }, [id])

  return (
    <>
      <CharacterSheetMunger
        id={id}
        character={character}
        characterSubType={characterSubType}
        characterAspects={characterAspects}
        skillList={skillList}
        stuntList={stuntList}
        isLoading={isLoading}
        handleDelete={handleDelete}
        activeUser={activeUser}
      />
    </>
  )
}

export default CharacterSheet