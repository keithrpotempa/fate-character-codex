  import React from "react";

  const SkillsDropdown = props => {
    return (
      <>
        <select
          className="skill-selector"
          placeholder="Filter by a skill" 
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