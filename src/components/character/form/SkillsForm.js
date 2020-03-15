import React, { useState, useEffect } from "react";
import ApiManager from "../../../modules/ApiManager"

const SkillsForm = props => {
  const characterSkills = props.characterSkills
  const [skillList, setSkillList] = useState([]);

  const getSkillList = () => {
    return ApiManager.getAll("skills")
      .then(setSkillList);
  }

  const handleFieldChange = evt => {
      const stateToChange = [...characterSkills]
      // FIXME: right now just doing the first skill in the array
      stateToChange[0] = parseInt(evt.target.value);
      props.setCharacterSkills(stateToChange)
  }

  useEffect(() => {
    getSkillList();
  }, [])

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

export default SkillsForm;