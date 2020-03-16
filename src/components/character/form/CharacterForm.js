import React, { useState, useEffect } from "react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";

const CharacterForm = props => {
  // All the state for the character form is here, in the parent component
  // but modified by the handleFieldChange functions of the children components
  const [character, setCharacter] = useState({name: ""});
  const [characterId, setCharacterId] = useState(0);
  // Seeding a default array of aspects
  // presently with their types hard coded
  const [aspects, setAspects] = useState([
    { name: "", aspectTypeId: 1 },
    { name: "", aspectTypeId: 2 },
    { name: "", aspectTypeId: 3 },    
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 }
  ])
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // TODO: likely have state for all the various attributes of a character


  // Depeneding on what kind of field is being changed,
  // the target's value is routed into different states
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
    // console.log("characterId", characterId)
    const aspectToSave = {
      name: aspect.name,
      characterId: characterId,
      aspectTypeId: aspect.aspectTypeId
      //FIXME: needs aspect type
    }
    return aspectToSave
  }

  const saveCharacter = character => {
    //TODO: implement edits as well
    return ApiManager.post("characters", character)
  }

  const saveAspect = aspect => {
    return ApiManager.post("characterAspects", aspect)
  }

  useEffect(() => {
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
            characterSkills={skills}
            setCharacterSkills={setSkills}
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