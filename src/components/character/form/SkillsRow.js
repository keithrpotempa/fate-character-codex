import React from "react";
import SkillsDropdown from "./SkillsDropDown"

const SkillsRow = props => {
  // Making a grid with x and y 
  // x is the row, y is the column 
  // x is also the Skill's rating #
  const x = parseInt(props.row)

  // TODO: figure out how to loop this so you only write it once
  return (
    <p className="skills-x"> <strong>+{x}</strong>
      <SkillsDropdown x={x} y="1" skillList={props.skillList} handleFieldChange={props.handleFieldChange}/> 
      <SkillsDropdown x={x} y="2" skillList={props.skillList} handleFieldChange={props.handleFieldChange}/> 
      <SkillsDropdown x={x} y="3" skillList={props.skillList} handleFieldChange={props.handleFieldChange}/> 
      <SkillsDropdown x={x} y="4" skillList={props.skillList} handleFieldChange={props.handleFieldChange}/>
      <SkillsDropdown x={x} y="5" skillList={props.skillList} handleFieldChange={props.handleFieldChange}/>
    </p>
  )
}

export default SkillsRow