import React from "react";
import { Dropdown } from 'semantic-ui-react';
import "../Character.css"

const StuntsDropdown = ({
  filter,
  stuntList,
  setCharacterStunts,
  characterStunts,
  x,
}) => {
  // Ick
  const filteredStuntList = filter === "" 
    ? stuntList 
    : stuntList.filter(stunt => stunt.skillId === filter);

  const stuntToEdit = characterStunts[x]

  const handleFieldChange = (evt, {name, value}) => {
    const stuntId = value;
    const row = x;
    const stateToChange = {...characterStunts}
    stateToChange[row] = stuntId
    setCharacterStunts(stateToChange);
  }

  return (
    <>
      {/* <div className="stunt-selector"> */}
        <Dropdown
          clearable
          placeholder="Select Stunt"
          selection
          id={`stunts--${x}`}
          onChange={handleFieldChange}
          value={stuntToEdit}
          options={filteredStuntList.map(stunt => (
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