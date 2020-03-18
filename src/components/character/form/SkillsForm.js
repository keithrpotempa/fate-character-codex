import React, { useState, useEffect } from "react";
import SkillsRow from "./SkillsRow"

const SkillsForm = props => {
  const setCharacterSkills = props.setCharacterSkills;
  const characterSkills = props.characterSkills;
  
  // FIXME: will need adjusting with multiselector
  // Value comes from the Semantic UI component
  // https://medium.com/@omallek/a-beginners-story-to-using-semantic-ui-react-24002da738e5
  const handleFieldChange = (evt, {name, value}) => {
    const skillIds = value
    const row = parseInt(name.split("-")[1]);
    const stateToChange = {...characterSkills}
    stateToChange[row] = skillIds
    setCharacterSkills(stateToChange);
    };

  useEffect(() => {

  }, [])

  return (
    <>
      <div className="skills-container">
        <h3>Skills</h3>
        <div>
          {/* Using a classname to determine the "rating" of a particular chosen skill */}
          {/* TODO: figure out how to loop this so you only write it once*/}
          <SkillsRow row="6" skillList={props.skillList} handleFieldChange={handleFieldChange}/>
          <SkillsRow row="5" skillList={props.skillList} handleFieldChange={handleFieldChange}/>
          <SkillsRow row="4" skillList={props.skillList} handleFieldChange={handleFieldChange}/>
          <SkillsRow row="3" skillList={props.skillList} handleFieldChange={handleFieldChange}/>
          <SkillsRow row="2" skillList={props.skillList} handleFieldChange={handleFieldChange}/>
          <SkillsRow row="1" skillList={props.skillList} handleFieldChange={handleFieldChange}/>
        </div>
      </div>
    </>
  )
}

export default SkillsForm;