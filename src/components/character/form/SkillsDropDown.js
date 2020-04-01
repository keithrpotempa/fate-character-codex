  import React from "react";
  import { Dropdown } from 'semantic-ui-react';
  import "../Character.css"

  const SkillsDropdown = props => {
    return (
      <>
        {/* <div className="skill-selector"> */}
          <Dropdown
            clearable
            placeholder="Filter by related skill"
            selection
            id={`${props.x}:${props.y}`}
            onChange={props.handleFieldChange}
            options={props.skillList.map(skill => (
              {
                key: `skill-${skill.id}--row-${props.x}`, 
                value: `${skill.id}`,
                text: `${skill.name}`
              }
            ))}
          />
        {/* </div> */}
      </>
    )
  } 
  export default SkillsDropdown;