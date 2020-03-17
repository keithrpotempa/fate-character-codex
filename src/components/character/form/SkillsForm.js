import React, { useState, useEffect } from "react";
import SkillsRow from "./SkillsRow"

const SkillsForm = props => {
  const setCharacterSkills = props.setCharacterSkills;
  const characterSkills = props.characterSkills;
  // TODO: filter out skills already chosen for future dropdowns
  // const setSkillList = props.setSkillList;

  
  // FIXME: will need adjusting with multiselector
  const handleFieldChange = evt => {
    const selected = [...evt.target.options]
      .filter(o => o.selected)
      .map(o => o.value)
    selected.forEach(option => {
      // The "default" [Choose Skill] has an id of 0
      // so we don't want to ever that
      const optionId = parseInt(option)
      if (optionId !== 0) {
        const stateToChange = [...characterSkills];
        const objectToSave = {
          // FIXME: grid position?
          gridPosition: "FIXME", 
          skillId: optionId,
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
    })
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