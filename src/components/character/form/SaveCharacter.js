import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ApiManager from "../../../modules/ApiManager";

// TODO: CONFIGURE SAVE ON EDIT

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

    // TODO: TEST. If this is an edit, we also need the id
    if (isEdit) {
      characterToSave.id = props.match.params.characterId;
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
      characterId: characterId,
      skillId: parseInt(skill),
      skillRating: parseInt(rating)
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
  
  /* ------------ SAVING ------------ */
  const handleSave = evt => {
    evt.preventDefault();

    // SAVING CHARACTER
    const char = constructCharacter()
    if (validChar(char)) {
      setIsLoading(true);
      isEdit 
        ? ApiManager.update("characters", char)
        : ApiManager.post("characters", char)
         // SAVING ASPECTS
          .then(characterResp => {
            aspects.forEach(aspect => {
              // This keeps blank aspects from being posted
              if (aspect.name !== "") {
                const aspectToSave = constructAspect(aspect, characterResp.id)
                isEdit
                  ? ApiManager.update("characterAspects", aspectToSave)
                  : ApiManager.post("characterAspects", aspectToSave)
              } 
            })
            return characterResp.id;
          })
        
        // SAVING SKILLS
        .then(characterId => {
          for (const property in skills) {
            const skillsAtRating = skills[property]
            const rating = property
            if (skillsAtRating.length > 0) {
              skillsAtRating.forEach(skill => {
                const skillToSave = constructSkill(skill, rating, characterId)
                isEdit
                  ? ApiManager.update("characterSkills", skillToSave)
                  : ApiManager.post("characterSkills", skillToSave)
              })
            }
          }
          return characterId; 
        })

        // SAVING STUNTS
        .then(characterId => {
          stunts.forEach(stunt => {
            const stuntToSave = constructStunt(stunt, characterId)
            isEdit
              ? ApiManager.update("characterStunts", stuntToSave)
              : ApiManager.post("characterStunts", stuntToSave)
          })  
          return characterId;
        })

        // REDIRECT TO CHARACTER PAGE
        // FIXME: It redirects before everything has been posted...
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
