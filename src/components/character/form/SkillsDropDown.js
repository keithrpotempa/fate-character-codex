  import React from "react";

  // FIXME: dropdowns get wiped by re-rendering dom, 
  // though the info is properly saved 
  const SkillsDropdown = props => {
    return (
      <>
        <select
          className="skill-selector"
          id={`${props.x}:${props.y}`}
          onChange={props.handleFieldChange}
        >
          {props.skillList.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </>
    )
  } 
  export default SkillsDropdown;