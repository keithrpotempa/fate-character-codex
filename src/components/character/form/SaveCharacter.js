import React from "react";
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ApiManager from "../../../modules/ApiManager";

const SaveCharacter = props => {
  const character = props.character;
  const aspects = props.aspects;
  const skills = props.skills;
  const stunts = props.stunts;
  const isLoading = props.isLoading;
  const setIsLoading= props.setIsLoading;

  /* ------------ OBJECT CONSTRUCTORS ------------ */
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

  const constructAspect = (aspect, characterId) => {
    const aspectToSave = {
      name: aspect.name,
      characterId: characterId,
      aspectTypeId: aspect.aspectTypeId
    }
    return aspectToSave;
  }

  const constructSkill = (skill, characterId) => {
    const skillToSave = {
      characterId: characterId,
      skillId: skill.skillId,
      skillRating: skill.skillRating
    }
    return skillToSave;
  }

  const constructStunt = (stunt, characterId) => {
    const stuntToSave = {
      characterId: characterId,
      stuntId: stunt.stuntId,
    }
    return stuntToSave;
  } 

  /* ------------ VALIDATIONS ------------ */
  const validateChar = char => {
    return char.name === "" ? false : true 
  }
  
  /* ------------ SAVING ------------ */
  const handleSave = evt => {
    evt.preventDefault();
    setIsLoading(true);

    // POSTING CHARACTER
    const char = constructCharacter()
    validateChar(char) ? ApiManager.post("characters", char) : null

    // POSTING ASPECTS
    .then(characterResp => {
      aspects.forEach(aspect => {
        // Keeps from posting blank aspects
        if (aspect.name !== "") {
          const aspectToSave = constructAspect(aspect, characterResp.id)
          ApiManager.post("characterAspects", aspectToSave)
        } 
      })
      return characterResp;
    })

    // POSTING SKILLS
    .then(characterResp => {
      skills.forEach(skill => {
        const skillToSave = constructSkill(skill, characterResp.id)
        ApiManager.post("characterSkills", skillToSave)
      })
      return characterResp; 
    })

    // POSTING STUNTS
    .then(characterResp => {
      stunts.forEach(stunt => {
        const stuntToSave = constructStunt(stunt, characterResp.id)
        ApiManager.post("characterStunts", stuntToSave)
      })  
      return characterResp;
    })

    // REDIRECT TO CHARACTER PAGE
    .then(props.history.push("/characters"))
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
