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

  // skillList had to be "lifted" because it is needed by
  // both SkillsForm and StuntsForm child components
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
          <SaveCharacter 
            character={character}
            aspects={aspects}
            skills={skills}
            stunts={stunts}
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