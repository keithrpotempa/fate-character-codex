import React from "react";

const StuntsDropdown = props => {
  const stuntList = props.stuntList;
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;

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

  if (props.filter === "") {
    return (
      <>
        <select
          className="stunt-selector"
          id={`stunts--${props.x}`}
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
  } else {
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
}

export default StuntsDropdown;