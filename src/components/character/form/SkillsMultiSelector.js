import React from "react";
import { Dropdown } from 'semantic-ui-react';

// FIXME: dropdowns get wiped by re-rendering dom, 
// though the info is properly saved 
const SkillsMultiSelector = props => {

  return (
    <>
      <Dropdown placeholder='Skills' fluid multiple selection options={props.skillList} />
      {/* <select multiple=""
        className="skill-selector ui fluid dropdown"
        id={`${props.x}:${props.y}`}
        onChange={props.handleFieldChange}
      >
        {props.skillList.map(skill => (
          <option key={skill.id} value={skill.id}>
            {skill.name}
          </option>
        ))}
      </select> */}
    </>
  )
} 
export default SkillsMultiSelector;