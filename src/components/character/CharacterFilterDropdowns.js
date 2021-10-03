
import React from "react";
import { Button, Icon, Dropdown } from "semantic-ui-react"
import { useFateRules } from "../../hooks/useFateRules";

const CharacterFilterDropdowns = ({ props, handleFilterFieldChange, filter }) => {
  const { characterTypes, characterSubTypes } = useFateRules();

  const renderSubtypes = () => {
    let subtypes = characterSubTypes
      .sort((a,b) => a.name.localeCompare(b.name))
    if (filter.type !== "") {
      subtypes = subtypes
        .filter(subtype => subtype.characterTypeId === parseInt(filter.type))
    }
    return subtypes.map(type => (
      {
        key: `type-${type.id}`,
        value: `${type.id}`,
        text: `${type.name}`
      }
    ))
  }
  
  return (
    <>
      <div className="filter-div">
        <Button
          type="button"
          onClick={() => {props.history.push("/new-character")}}
        >
          <Icon className="add user"></Icon>
        </Button>
        <Dropdown
          clearable 
          selection
          onChange={handleFilterFieldChange}
          className="type"
          name="type"
          id="type"
          placeholder="Filter by type"
          value={filter.type}
          options={characterTypes.map(type => (
            {
              key: `type-${type.id}`,
              value: `${type.id}`,
              text: `${type.name}`
            }
          ))}
        />
        <Dropdown 
          clearable
          selection
          onChange={handleFilterFieldChange}
          className="subtype"
          name="subtype"
          id="subtype"
          placeholder="Character Subtype"
          value={filter.subtype}
          options={renderSubtypes()}
        />
    </div>
    </>
  )
}

export default CharacterFilterDropdowns;