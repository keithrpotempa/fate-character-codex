import React from "react";
import { Dropdown } from "semantic-ui-react";
import "../Character.css"

const SkillsMultiSelector = props => {
  const row = props.row
  // See formatting reference:
  // https://react.semantic-ui.com/modules/dropdown/#types-multiple-selection
  return (
    <>
      <div className="skill-multiselector">
        <strong>+{row}</strong>
        <Dropdown 
          placeholder='Skills' 
          className="skill-multiselector"
          fluid multiple selection 
          row={row}
          name={`skills-${row}`}
          id={`skills-${row}`}
          onChange={props.handleFieldChange}
          options={props.skillList.map(skill => (
            {
              key: `${skill.id}`,
              value: `${skill.id}`,
              text: `${skill.name}`
            }
          ))}
        />
      </div>
    </>
  )
} 
export default SkillsMultiSelector;