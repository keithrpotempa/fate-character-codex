import React, { useState, useEffect } from "react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";
import StuntsForm from "./StuntsForm";
import SaveCharacter from "./SaveCharacter";

const CharacterForm = props => {
  // All the state for the character form is here, in the parent component
  // but modified by the handleFieldChange functions of the children components
  const [character, setCharacter] = useState({name: ""});

  // Seeding a default array of aspects
  // presently with their types (currently) hard coded
  const [characterAspects, setCharacterAspects] = useState([
    { name: "", aspectTypeId: 1 },
    { name: "", aspectTypeId: 2 },
    { name: "", aspectTypeId: 3 },    
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 }
  ])
  const [characterSkills, setCharacterSkills] = useState({
    6: [],
    5: [],
    4: [],
    3: [],
    2: [],
    1: []
  });
  const [skillList, setSkillList] = useState([]);
  const [characterStunts, setCharacterStunts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // skillList had to be "lifted" because it is needed by
  // both SkillsForm and StuntsForm child components
  const getSkillList = () => {
    return ApiManager.getAll("skills")
      .then(setSkillList);      
  }

  // Note: Most field changes are handled 
  // by their respective child components
  const handleFieldChange = evt => {
    const stateToChange = {...character};
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange)
  }

  const editSetup = () => {
    // If this is an edit, the following needs to happen:
    const characterId = props.match.params.characterId
    // Get the character and put them in state
    ApiManager.get("characters", characterId)
      .then(character => setCharacter(character))
      // Get their aspects and put them in state
    ApiManager.getCharacterAspects(characterId)
      .then(aspects => setCharacterAspects(aspects))
      // TODO: Get their skills and put them in state
      // TODO: Get their stunts and put them in state
  }

  useEffect(() => {
    getSkillList();
    // AKA: if this is an edit
    if (props.match.params.characterId) {
      editSetup();
    }
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
            value={character.name}
          />
          <AspectForm 
            aspects={characterAspects}
            setAspects={setCharacterAspects}
          />
          <SkillsForm 
            skillList={skillList}
            setSkillList={setSkillList}
            characterSkills={characterSkills}
            setCharacterSkills={setCharacterSkills}
          />
          <StuntsForm
            characterStunts={characterStunts}
            setCharacterStunts={setCharacterStunts}
            skillList={skillList}
          />
          <SaveCharacter 
            character={character}
            aspects={characterAspects}
            skills={characterSkills}
            stunts={characterStunts}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            {...props}
          />
        </fieldset>
      </form>
    </>
  )

}

export default CharacterForm;