import React, { useState, useEffect } from "react";
import ApiManager from "../../../modules/ApiManager"

const SkillsForm = props => {
  const characterSkills = props.characterSkills
  const [skillList, setSkillList] = useState([]);

  const getSkillList = () => {
    return ApiManager.getAll("skills")
      // Hacky way of adding a default / blank value to the list
      .then(skills => {
        skills.unshift({id: 0, name: "[Choose Skill]"})
        return skills
      })
      .then(setSkillList);      
  }

  const handleFieldChange = evt => {
    /*{ skillId: 0, skillRating: 0 }*/
    // Utilize a positional grid: second +1 === "skills-grid--1-2"
    const stateToChange = [...characterSkills]
    // FIXME: right now just doing the first skill in the array
    stateToChange[0] = parseInt(evt.target.value);
    props.setCharacterSkills(stateToChange)
  }

  const SkillsDropdown = () => {
    return (
      <>
        <select
          className="skill"
          id="skill"
          onChange={handleFieldChange}
        >
          {skillList.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </>
    )
  } 

  useEffect(() => {
    getSkillList();
  }, [])

  return (
    <>
      <div className="skills-container">
        <h3>Skills</h3>
        <div>
          {/* Using a classname to determine the "rating" of a particular chosen skill */}
          <p className="skills-6"> +6 <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/></p>
          <p className="skills-5"> +5 <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/></p>
          <p className="skills-4"> +4 <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/></p>
          <p className="skills-3"> +3 <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/></p>
          <p className="skills-2"> +2 <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/></p>
          <p className="skills-1"> +1 <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/> <SkillsDropdown/></p>
        </div>
      </div>
    </>
  )
}

export default SkillsForm;