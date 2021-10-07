import React from "react";
import { Dropdown } from "semantic-ui-react";
import "../Character.css"

const SkillsMultiSelector = ({
  row,
  characterSkills,
  handleFieldChange,
  skillList,
}) => {
  const skillsAtRow = characterSkills[row]

  const usedSkills = Object.values(characterSkills).flat();

  const unusedSkillList = skillList.filter((s) => {
    const currentSkillAlreadySelected = usedSkills.includes(s.id)
    const currentSkillExistsInCurrentRow = skillsAtRow.includes(s.id)
    // Keep skills that are either: 
    // 1) selected in the current row
    // 2) haven't been selected in other rows 
    return currentSkillExistsInCurrentRow || !currentSkillAlreadySelected
  })

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
          value={skillsAtRow}
          onChange={handleFieldChange}
          options={unusedSkillList.map(skill => (
            {
              key: `${skill.id}`,
              value: skill.id,
              text: `${skill.name}`
            }
          ))}
        />
      </div>
    </>
  )
} 
export default SkillsMultiSelector;