import React, { useState, useEffect } from "react";
import ApiManager from "../../../modules/ApiManager"

const SkillsForm = props => {
  const setCharacterSkills = props.setCharacterSkills;
  const characterSkills = props.characterSkills;
  const skillList = props.skillList;
  const setSkillList = props.setSkillList;

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

  // FIXME: dropdowns get wiped by re-rendering dom, 
  // though the info is properly saved 
  const SkillsDropdown = props => {
    return (
      <>
        <select
          className="skill-selector"
          id={`${props.x}:${props.y}`}
          onChange={handleFieldChange}
        >
          {skillList.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </>
    )
  } 

  const SkillsRow = props => {
    // Making a grid with x and y 
    // x is the row, y is the column 
    // x is also the Skill's rating #
    const x = parseInt(props.row)

    // TODO: figure out how to loop this so you only write it once
    return (
      <p className="skills-x"> <strong>+{x}</strong>
       <SkillsDropdown x={x} y="1"/> 
       <SkillsDropdown x={x} y="2"/> 
       <SkillsDropdown x={x} y="3"/> 
       <SkillsDropdown x={x} y="4"/>
       <SkillsDropdown x={x} y="5"/>
      </p>
    )
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
          <SkillsRow row="6"/>
          <SkillsRow row="5"/>
          <SkillsRow row="4"/>
          <SkillsRow row="3"/>
          <SkillsRow row="2"/>
          <SkillsRow row="1"/>
        </div>
      </div>
    </>
  )
}

export default SkillsForm;