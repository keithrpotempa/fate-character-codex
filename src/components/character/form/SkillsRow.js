import React from "react";
import SkillsMultiSelector from "./SkillsMultiSelector";

const SkillsRow = props => {
  // Making a grid with x and y 
  // x is the row, y is the column 
  // x is also the Skill's rating #
  const x = parseInt(props.row)

  // TODO: figure out how to loop this so you only write it once
  return (
    <div className="skills-x"> <strong>+{x}</strong>
      <SkillsMultiSelector x={x} skillList={props.skillList} handleFieldChange={props.handleFieldChange}/> 
    </div>
  )
}

export default SkillsRow