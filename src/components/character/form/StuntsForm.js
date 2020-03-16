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
    const stateToChange = [...characterStunts]
    const row = parseInt(evt.target.id.split("--")[1])
    const objectToSave = {
      row: row,
      stuntId: parseInt(evt.target.value)
    }
    // Finding the item in the array with a row position equal to the select field's
    const indexToChange = stateToChange.findIndex( obj => obj.row === row );
    /* Since findIndex returns -1 if it can't find anything, 
      when we get a -1, we create a new object in the array 
      Otherwise, change that existing object in state */
    indexToChange === -1 
      ? stateToChange.push(objectToSave) 
      : stateToChange[indexToChange] = objectToSave;
    setCharacterStunts(stateToChange);
  }

  const handleFilter = evt => {
    // This is deciding which filter to set, 
    // based on the row of the dropdown used
    const rowNumber = parseInt(evt.target.id.split("--")[1])
    const valueToSet = parseInt(evt.target.value)

    switch (rowNumber) {
      case 1:
        setFilter1(valueToSet);
        break;
      case 2:
        setFilter2(valueToSet);
        break;
      case 3:
        setFilter3(valueToSet);
        break;
      case 4:
        setFilter4(valueToSet);
        break;
      case 5:
        setFilter5(valueToSet);
        break;
      default:
        break;
    }
  }
  // FIXME: dropdowns get wiped by re-rendering dom, 
  // though the info is properly saved 
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

  // FIXME: dropdowns get wiped by re-rendering dom, 
  // though the info is properly saved 
  const StuntsDropdown = props => {
    const filteredList = stuntList.filter(stunt => stunt.skillId === props.filter)

    return (
      <>
        <select
          className="stunt-selector"
          id={`stunts--${props.x}`}
          onChange={handleFieldChange}
        >
          {filteredList.map(stunt => (
            <option key={stunt.id} value={stunt.id}>
              {stunt.name}
            </option>
          ))}
        </select>
      </>
    )
  }

  const StuntDescription = props => {
    const match = characterStunts.find( obj => obj.row === parseInt(props.x) )

    if (match !== undefined) {
      const stunt = stuntList.find(stunt => stunt.id === match.stuntId)
      return (
        <>
          <span>{stunt.description}</span>
        </>
      )
    } else {
      return (
        <>
        </>
      )
    }
  }

  useEffect(() => {
    getStuntList();
  }, [filter1, filter2, filter3, filter4, filter5])

  return (
    <>
      <h3>Stunts</h3>
      <p>Filter by skill <SkillsDropdown x="1"/><StuntsDropdown x="1" filter={filter1}/><StuntDescription x="1"/></p>
      <p>Filter by skill <SkillsDropdown x="2"/><StuntsDropdown x="2" filter={filter2}/><StuntDescription x="2"/></p>
      <p>Filter by skill <SkillsDropdown x="3"/><StuntsDropdown x="3" filter={filter3}/><StuntDescription x="3"/></p>
      <p>Filter by skill <SkillsDropdown x="4"/><StuntsDropdown x="4" filter={filter4}/><StuntDescription x="4"/></p>
      <p>Filter by skill <SkillsDropdown x="5"/><StuntsDropdown x="5" filter={filter5}/><StuntDescription x="5"/></p>
    </>
  )
}

export default StuntsForm;