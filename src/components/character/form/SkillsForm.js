import React from "react";
import SkillsMultiSelector from "./SkillsMultiSelector"

const SkillsForm = props => {
  const setCharacterSkills = props.setCharacterSkills;
  const characterSkills = props.characterSkills;
  
  // Value comes from the Semantic UI component
  // https://medium.com/@omallek/a-beginners-story-to-using-semantic-ui-react-24002da738e5
  const handleFieldChange = (evt, {name, value}) => {
    const skillIds = value
    const row = parseInt(name.split("-")[1]);
    const stateToChange = {...characterSkills}
    stateToChange[row] = skillIds
    setCharacterSkills(stateToChange);
    };

  return (
    <>
      <div className="skills-container">
        <h3>Skills</h3>
        <div>
          {/* Using this row prop to determine the "rating" of a particular chosen skill */}
          {/* TODO: figure out how to loop this so you only write it once and can generate more dynamically*/}
          <SkillsMultiSelector row="6" skillList={props.skillList} characterSkills={characterSkills} handleFieldChange={handleFieldChange} /> 
          <SkillsMultiSelector row="5" skillList={props.skillList} characterSkills={characterSkills} handleFieldChange={handleFieldChange} /> 
          <SkillsMultiSelector row="4" skillList={props.skillList} characterSkills={characterSkills} handleFieldChange={handleFieldChange} /> 
          <SkillsMultiSelector row="3" skillList={props.skillList} characterSkills={characterSkills} handleFieldChange={handleFieldChange} /> 
          <SkillsMultiSelector row="2" skillList={props.skillList} characterSkills={characterSkills} handleFieldChange={handleFieldChange} /> 
          <SkillsMultiSelector row="1" skillList={props.skillList} characterSkills={characterSkills} handleFieldChange={handleFieldChange} /> 
        </div>
      </div>
    </>
  )
}


export default SkillsForm;