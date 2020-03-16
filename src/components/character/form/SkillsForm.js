import React, { useState, useEffect } from "react";
import SkillsRow from "./SkillsRow"

const SkillsForm = props => {
  const setCharacterSkills = props.setCharacterSkills;
  const characterSkills = props.characterSkills;
  // TODO: filter out skills already chosen for future dropdowns
  // const setSkillList = props.setSkillList;

  const handleFieldChange = evt => {
    const stateToChange = [...characterSkills];
    const objectToSave = {
      gridPosition: evt.target.id, 
      skillId: parseInt(evt.target.value),
      skillRating: parseInt(evt.target.id.split(":")[0])
    }
    // Finding the item in the array with a grid position equal to the select field's
    const indexToChange = stateToChange.findIndex( obj => obj.gridPosition === evt.target.id );
    /* Since findIndex returns -1 if it can't find anything, 
      when we get a -1, we create a new object in the array 
      Otherwise, change that existing object in state */
    indexToChange === -1 
      ? stateToChange.push(objectToSave) 
      : stateToChange[indexToChange] = objectToSave;
    setCharacterSkills(stateToChange);
  }

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