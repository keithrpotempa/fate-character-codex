import React, { useState, useEffect } from "react";
import ApiManager from "../../../modules/ApiManager";

const StuntsForm = props => {
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;
  const skillList = props.skillList;
  const [stuntList, setStuntList] = useState([]);

  const [filter1, setFilter1] = useState([]);
  const [filter2, setFilter2] = useState([]);
  const [filter3, setFilter3] = useState([]);
  const [filter4, setFilter4] = useState([]);
  const [filter5, setFilter5] = useState([]);

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

  const handleFilter = evt => {
    const rowNumber = parseInt(evt.target.id.split("--")[1])

    switch (rowNumber) {
      case 1:
        setFilter1(parseInt(evt.target.value));
        break;
      case 2:
        setFilter2(parseInt(evt.target.value));
        break;
      case 3:
        setFilter3(parseInt(evt.target.value));
        break;
      case 4:
        setFilter4(parseInt(evt.target.value));
        break;
      case 5:
        setFilter5(parseInt(evt.target.value));
        break;
      default:
        break;
    }
  }

  const SkillsDropdown = props => {
    return (
      <>
        <select
          className="skill-selector"
          id={`skill-filter--${props.x}`}
          onChange={handleFilter}
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
          {stuntList.filter(stunt => stunt.skillId === props.filter)
            .map(stunt => (
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
  }, [filter1, filter2, filter3, filter4, filter5])

  return (
    <>
      <h3>Stunts</h3>
      <p>Filter by skill <SkillsDropdown x="1"/><StuntsDropdown x="1" filter={filter1}/></p>
      <p>Filter by skill <SkillsDropdown x="2"/><StuntsDropdown x="2" filter={filter2}/></p>
      <p>Filter by skill <SkillsDropdown x="3"/><StuntsDropdown x="3" filter={filter3}/></p>
      <p>Filter by skill <SkillsDropdown x="4"/><StuntsDropdown x="4" filter={filter4}/></p>
      <p>Filter by skill <SkillsDropdown x="5"/><StuntsDropdown x="5" filter={filter5}/></p>
    </>
  )
}

export default StuntsForm;