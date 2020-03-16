import React, { useState, useEffect } from "react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";
import StuntsForm from "./StuntsForm";

const CharacterForm = props => {
  // All the state for the character form is here, in the parent component
  // but modified by the handleFieldChange functions of the children components
  const [character, setCharacter] = useState({name: ""});
  const [characterId, setCharacterId] = useState(0);
  // Seeding a default array of aspects
  // presently with their types (currently) hard coded
  const [aspects, setAspects] = useState([
    { name: "", aspectTypeId: 1 },
    { name: "", aspectTypeId: 2 },
    { name: "", aspectTypeId: 3 },    
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 }
  ])
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [stunts, setStunts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSkillList = () => {
    return ApiManager.getAll("skills")
      // Hacky way of adding a default / blank value to the list
      .then(skills => {
        skills.unshift({id: 0, name: "[Choose Skill]"});
        return skills;
      })
      .then(setSkillList);      
  }

  // Note: Most field changes are handled 
  // by their respective child components
  const handleFieldChange = evt => {
    const stateToChange = {...character};
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange)
  }

  const handleSave = evt => {
    evt.preventDefault();
    setIsLoading(true);
    saveCharacter(constructCharacter(evt))
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
          saveAspect(constructAspect(aspect))
        }
      }))
      .then(skills.forEach(skill => {
        saveSkill(constructSkill(skill))
      }))
  }

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
    return aspectToSave
  }

  const constructSkill = skill => {
    const skillToSave = {
      characterId: characterId,
      skillId: skill.skillId,
      skillRating: skill.skillRating
    }
    return skillToSave
  }

  const saveCharacter = character => {
    return ApiManager.post("characters", character)
  }

  const saveAspect = aspect => {
    return ApiManager.post("characterAspects", aspect)
  }

  const saveSkill = skill => {
    return ApiManager.post("characterSkills", skill)
  }

  useEffect(() => {
    getSkillList();
    setIsLoading(false);
  }, [])

  return (
    <>
      <form>
        <fieldset>
          <label htmlFor="characterName">Name</label>
          <input 
            type="text"
            required
            onChange={handleFieldChange}
            className="character"
            id="name"
            placeholder="Character name"
          />
          <AspectForm 
            aspects={aspects}
            setAspects={setAspects}
          />
          <SkillsForm 
            skillList={skillList}
            setSkillList={setSkillList}
            characterSkills={skills}
            setCharacterSkills={setSkills}
          />
          <StuntsForm
            characterStunts={stunts}
            setCharacterStunts={setStunts}
            skillList={skillList}
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={(evt) => handleSave(evt)}
          >
            Save
          </button>
        </fieldset>
      </form>
    </>
  )

}

export default CharacterForm;