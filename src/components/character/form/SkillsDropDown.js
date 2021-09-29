  import React from "react";
  import { Dropdown } from 'semantic-ui-react';
  import "../Character.css"

  const SkillsDropdown = ({
    x,
    y,
    handleFieldChange,
    skillList,
  }) => {
    return (
      <>
        {/* <div className="skill-selector"> */}
          <Dropdown
            clearable
            placeholder="Filter by related skill"
            selection
            id={`${x}:${y}`}
            onChange={handleFieldChange}
            options={skillList.map(skill => (
              {
                key: `skill-${skill.id}--row-${x}`, 
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