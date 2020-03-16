import React, { useState, useEffect } from "react";
import ApiManager from "../../../modules/ApiManager";

const SaveCharacter = props => {
  const character = props.character;
  const aspects = props.aspects;
  const skills = props.skills;
  const stunts = props.stunts;
  const isLoading = props.isLoading;
  const setIsLoading= props.setIsLoading;

  const [characterId, setCharacterId] = useState();

  const constructCharacter = () => {
    // TODO: Validations
    const characterToSave = {
      name: character.name,
      //TODO: change with active storage
      userId: 1,
      created: new Date().toLocaleString(),
      modified: new Date().toLocaleString()
    }
    return characterToSave;
  }

  const constructAspect = aspect => {
    const aspectToSave = {
      name: aspect.name,
      characterId: characterId,
      aspectTypeId: aspect.aspectTypeId
    }
    return aspectToSave;
  }

  const constructSkill = skill => {
    const skillToSave = {
      characterId: characterId,
      skillId: skill.skillId,
      skillRating: skill.skillRating
    }
    return skillToSave;
  }

  const constructStunt = stunt => {
    const stuntToSave = {
      characterId: characterId,
      stuntId: stunt.stuntId,
    }
    return stuntToSave;
  } 

  const handleSave = evt => {
    evt.preventDefault();
    setIsLoading(true);

    const char = constructCharacter()
    ApiManager.post("characters", char)
    // Setting the assigned character ID in state 
    // to use in all subsequent api posts
    .then(resp => {
      console.log("resp.id", resp.id)
      setCharacterId(resp.id)
      // FIXME: for some reason, character ID isn't sticking...
      console.log("characterId", characterId)
    })
    .then(aspects.forEach(aspect => {
      // Keeps from posting blank aspects
      if (aspect.name !== "") {
        const aspectToSave = constructAspect(aspect)
        ApiManager.post("characterAspects", aspectToSave)
      }
    }))
    .then(skills.forEach(skill => {
      const skillToSave = constructSkill(skill)
      ApiManager.post("characterSkills", skillToSave)
    }))
    .then(stunts.forEach(stunt => {
      const stuntToSave = constructStunt(stunt)
      ApiManager.post("characterStunts", stuntToSave)
    }))
  }

  // useEffect(() => {}, [])

  return (
    <>
      <button
        type="button"
        disabled={isLoading}
        onClick={(evt) => handleSave(evt)}
      >
        Save
      </button>
    </>
  )
}

export default SaveCharacter;