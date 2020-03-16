import React, { useState, useEffect } from "react";
import ApiManager from "../../../modules/ApiManager";

const StuntsForm = props => {
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;
  const skillList = props.skillList;
  const [stuntList, setStuntList] = useState([]);

  const getStuntList = () => {
    return ApiManager.getAll("stunts")
    // Hacky way of adding a default / blank value to the list
    .then(stunts => {
      stunts.unshift({id: 0, name: "[Choose Stunt]"});
      return stunts;
    })
    .then(setStuntList); 
  }

  const handleFieldChange = evt => {
    console.log("handleFieldChange")
  }

  const SkillsDropdown = props => {
    return (
      <>
        <select
          className="skill-selector"
          id="skills"
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

  const StuntsDropdown = props => {
    return (
      <>
        <select
          className="stunt-selector"
          id="stunts"
          onChange={handleFieldChange}
        >
          {stuntList.map(stunt => (
            <option key={stunt.id} value={stunt.id}>
              {stunt.name}
            </option>
          ))}
        </select>
      </>
    )
  }

  useEffect(() => {
    getStuntList();
  }, [])

  return (
    <>
      <h3>Stunts</h3>
      <p>Filter by skill <SkillsDropdown/><StuntsDropdown/></p>
    </>
  )
}

export default StuntsForm;