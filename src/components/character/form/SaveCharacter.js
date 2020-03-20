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
  const isEdit = props.match.params.characterId ? true : false;
  const setIsLoading= props.setIsLoading;

  /* ------------ OBJECT CONSTRUCTORS ------------ */
  const constructCharacter = () => {
    // NOTE: JSON.parse is the reverse of JSON.stringify
    const user = JSON.parse(sessionStorage.getItem("credentials"));
    const characterToSave = {
      name: character.name,
      userId: user.id,
      created: new Date().toLocaleString(),
      modified: new Date().toLocaleString()
    }
    if (isEdit) {
      characterToSave.id = parseInt(props.match.params.characterId);
      characterToSave.created = character.created
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

  const constructSkill = (skill, rating, characterId) => {
    const skillToSave = {
      characterId: parseInt(characterId),
      skillId: parseInt(skill),
      skillRating: parseInt(rating)
    }
    return skillToSave;
  }

  const constructStunt = (stuntId, characterId) => {
    const stuntToSave = {
      characterId: parseInt(characterId),
      stuntId: parseInt(stuntId),
    }
    return stuntToSave;
  } 

  /* ------------ VALIDATIONS ------------ */
  // This should check that required fields are filled before allowing a submit
  const validChar = () => {
    const skillsAreEmpty = (characterSkills) => {
      const skillLevels = Object.values(characterSkills)
      const nonEmptySkillLevels = skillLevels.filter(skillLevel => skillLevel.length !== 0)
      if (nonEmptySkillLevels.length > 0) {
        return false;
      } else {
        return true;
      }
    }

    // TODO: keep someone from saving a character with duplicate skills

    if (character.name === "") {
      validationConfirm("Enter a character name")
    } else if (aspects[0].name === "") {
      validationConfirm("Enter a high aspect")
    } else if (skillsAreEmpty(skills)) {
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

  /* ------------ SAVING FUNCTIONS ------------ */
  // Made this an async function to allow it to have a .then after
  async function purge() {
    // IF edit, delete everything before starting?
    if (isEdit) {
      const userId = props.match.params.characterId;
      return ApiManager.delete("characters", userId)
    } else {
      return character
    }
  }

  const saveAspects = (charId) => {
    aspects.forEach(aspect => {
      // This keeps blank aspects from being posted
      if (aspect.name !== "") {
        const aspectToSave = constructAspect(aspect, charId)
        ApiManager.post("characterAspects", aspectToSave)
      } 
    })
    return charId;
  }

  const saveSkills = (charId) => {
    for (const row in skills) {
      const skillsAtRating = skills[row]
      const rating = row
      if (skillsAtRating.length > 0) {
        skillsAtRating.forEach(skill => {
          const skillToSave = constructSkill(skill, rating, charId)
          ApiManager.post("characterSkills", skillToSave)
        })
      }
    }
    return charId; 
  }

  const saveStunts = (charId) => {
    for (const row in stunts) {
      // Only build and post if there's 
      // actually a stunt selected on that row
      if (stunts[row]) {
        const stuntId = stunts[row]
        const stuntToSave = constructStunt(stuntId, charId)
        ApiManager.post("characterStunts", stuntToSave)
      }
    }  
    return charId;
  }

  /* ------------ SAVING ------------ */
  const handleSave = evt => {
    evt.preventDefault();
    // SAVING CHARACTER
    const char = constructCharacter()
    if (validChar(char)) {
      setIsLoading(true);
      purge()
        .then(resp => {
            // Not updating if everything is deleted
            ApiManager.post("characters", char)
              .then(resp => saveAspects(resp.id))
              .then(saveSkills)
              .then(saveStunts)
              // FIXME: this push is failing to render the newly saved char    
              .then(() => props.history.push("/characters"))
        })
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
