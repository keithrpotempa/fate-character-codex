import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
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
  // This should check that required fields are filled before allowing a submit
  const validChar = () => {
    if (character.name === "") {
      validationConfirm("Enter a character name")
    } else if (aspects[0].name === "") {
      validationConfirm("Enter a high aspect")
    } else if (skills.length === 0) {
      validationConfirm("Choose at least one skill")
    } else {
      return true
    }
  }

  const validationConfirm = (message) => {
    confirmAlert({
      title: 'Required Field',
      message: message,
      buttons: [
        {
          label: 'Ok',
          onClick: null
        }
      ]
    });
  }
  
  /* ------------ SAVING ------------ */
  const handleSave = evt => {
    evt.preventDefault();

    // POSTING CHARACTER
    const char = constructCharacter()
    if (validChar(char)) {
      setIsLoading(true);
      ApiManager.post("characters", char)
        // POSTING ASPECTS
        .then(characterResp => {
          aspects.forEach(aspect => {
            // This keeps blank aspects from being posted
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
