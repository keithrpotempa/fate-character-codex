import React from "react";
import { Dropdown } from 'semantic-ui-react';

const StuntsDropdown = props => {
  // Ick
  const stuntList = props.filter === "" 
    ? props.stuntList 
    : props.stuntList.filter(stunt => stunt.skillId === props.filter);
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;

  // Real hacky way to get the edited stunt values without erroring out
  // after realizing functions don't work in the value field of a select
  // FIXME: DOM re-rendering keeps the dropdown locked though

  const stuntToEdit = props.characterStunts[props.x]

  // const stuntToEdit = props.characterStunts.length > 0 ? props.characterStunts[props.x - 1] : ""
  // const stuntIdToEdit = stuntToEdit ? stuntToEdit.stuntId.toString() : ""

  const handleFieldChange = (evt, {name, value}) => {
    const stuntId = value;
    const row = props.x;
    const stateToChange = {...characterStunts}
    stateToChange[row] = stuntId
    setCharacterStunts(stateToChange);
  }

  return (
    <>
      <Dropdown
        placeholder="Select Stunt"
        fluid
        selection
        className="stunt-selector"
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
    </>
  )
}

export default StuntsDropdown;