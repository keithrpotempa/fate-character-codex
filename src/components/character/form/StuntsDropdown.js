import React from "react";
import { Dropdown } from 'semantic-ui-react';
import "../Character.css"

const StuntsDropdown = props => {
  // Ick
  const stuntList = props.filter === "" 
    ? props.stuntList 
    : props.stuntList.filter(stunt => stunt.skillId === props.filter);
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;

  const stuntToEdit = props.characterStunts[props.x]

  const handleFieldChange = (evt, {name, value}) => {
    const stuntId = value;
    const row = props.x;
    const stateToChange = {...characterStunts}
    stateToChange[row] = stuntId
    setCharacterStunts(stateToChange);
  }

  return (
    <>
      {/* <div className="stunt-selector"> */}
        <Dropdown
          placeholder="Select Stunt"
          selection
          id={`stunts--${props.x}`}
          onChange={handleFieldChange}
          value={stuntToEdit}
          options={stuntList.map(stunt => (
            {
              key: `${stunt.id}`, 
              value: `${stunt.id}`,
              text: `${stunt.name}`
            }
          ))}
        />
      {/* </div> */}
    </>
  )
}

export default StuntsDropdown;