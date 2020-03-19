import React from "react";
import { Dropdown } from 'semantic-ui-react';

const StuntsDropdown = props => {
  const stuntList = props.stuntList;
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;

  // Real hacky way to get the edited stunt values without erroring out
  // after realizing functions don't work in the value field of a select
  // FIXME: DOM re-rendering keeps the dropdown locked though
  const stuntToEdit = props.characterStunts.length > 0 ? props.characterStunts[props.x - 1] : ""
  const stuntIdToEdit = stuntToEdit ? stuntToEdit.stuntId.toString() : ""

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
        <Dropdown
          placeholder="Select Stunt"
          fluid
          selection
          className="stunt-selector"
          id={`stunts--${props.x}`}
          onChange={handleFieldChange}
          value={stuntIdToEdit}
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

/*

import React from 'react'
import { Dropdown } from 'semantic-ui-react'

const friendOptions = [
  {
    key: 'Jenny Hess',
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
  },
  {
    key: 'Elliot Fu',
    text: 'Elliot Fu',
    value: 'Elliot Fu',
    image: { avatar: true, src: '/images/avatar/small/elliot.jpg' },
  },
  {
    key: 'Stevie Feliciano',
    text: 'Stevie Feliciano',
    value: 'Stevie Feliciano',
    image: { avatar: true, src: '/images/avatar/small/stevie.jpg' },
  },
  {
    key: 'Christian',
    text: 'Christian',
    value: 'Christian',
    image: { avatar: true, src: '/images/avatar/small/christian.jpg' },
  },
  {
    key: 'Matt',
    text: 'Matt',
    value: 'Matt',
    image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
  },
  {
    key: 'Justen Kitsune',
    text: 'Justen Kitsune',
    value: 'Justen Kitsune',
    image: { avatar: true, src: '/images/avatar/small/justen.jpg' },
  },
]

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder='Select Friend'
    fluid
    selection
    options={friendOptions}
  />
)

export default DropdownExampleSelection

*/