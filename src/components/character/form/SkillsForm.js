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

  const SkillsRow = props => {
    // Making a grid with x and y 
    // x is the row, y is the column 
    // x is also the Skill's rating #
    const x = parseInt(props.row)

    // TODO: figure out how to loop this so you only write it once
    return (
      <p className="skills-x"> <strong>+{x}</strong>
       <SkillsDropdown x={x} y="1"/> 
       <SkillsDropdown x={x} y="2"/> 
       <SkillsDropdown x={x} y="3"/> 
       <SkillsDropdown x={x} y="4"/>
       <SkillsDropdown x={x} y="5"/>
      </p>
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
          {/* TODO: figure out how to loop this so you only write it once*/}
          <SkillsRow row="6"/>
          <SkillsRow row="5"/>
          <SkillsRow row="4"/>
          <SkillsRow row="3"/>
          <SkillsRow row="2"/>
          <SkillsRow row="1"/>
        </div>
      </div>
    </>
  )
}

export default SkillsForm;