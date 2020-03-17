import React from "react";
import { Dropdown } from "semantic-ui-react";

// FIXME: dropdowns get wiped by re-rendering dom, 
// though the info is properly saved 
const SkillsMultiSelector = props => {

  // See formatting reference:
  // https://react.semantic-ui.com/modules/dropdown/#types-multiple-selection
  return (
    <>
      <Dropdown placeholder='Skills' 
        fluid multiple selection 
        onChange={props.handleFieldChange}
        options={props.skillList.map(skill => (
          {
            key: `${skill.id}`, 
            value: `${skill.id}`,
            text: `${skill.name}`
          }
        ))}
      />
    </>
  )
} 
export default SkillsMultiSelector;