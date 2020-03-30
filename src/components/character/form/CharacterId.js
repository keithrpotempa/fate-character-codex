import React from "react";
import { Divider, Dropdown, Form } from "semantic-ui-react";

const CharacterId = props => {
  const character = props.character; 

  const handleFieldChange = (evt, {name, value}) => {
    const stateToChange = {...character};
    stateToChange[name] = value;
    // If they're a PC, set their subtype for them
    // (there's no subtype for PCs)
    if (value === "1") {
      stateToChange["subtype"] = "6";
    }
    props.setCharacter(stateToChange)
  }

  return (
    <>
      <Divider horizontal><h2>ID</h2></Divider>
      <Form.Field>
        <label htmlFor="characterName">Name</label>
        <Form.Input 
          type="text"
          required
          onChange={handleFieldChange}
          className="character"
          name="name"
          id="name"
          placeholder="Character name"
          value={character.name}
        />
        <Dropdown 
          required
          selection
          onChange={handleFieldChange}
          className="type"
          name="type"
          id="type"
          placeholder="Character type"
          // value={character.typeId}
          options={props.characterTypeList.map(type => (
            {
              key: `type-${type.id}`,
              value: `${type.id}`,
              text: `${type.name}`
            }
          ))}
        />
        {// Don't display this option until a type is chosen
          // And don't display it if they're a PC (no additional choice necessary)
          character.type === "" || character.type === "1"
            ? <></>
            : <Dropdown 
                required
                selection
                onChange={handleFieldChange}
                className="subtype"
                name="subtype"
                id="subtype"
                placeholder="Character Subtype"
                value={character.subtypeId}
                options={props.characterSubTypeList
                  .filter(subtype => subtype.characterTypeId === parseInt(character.type))
                  .map(type => (
                  {
                    key: `type-${type.id}`,
                    value: `${type.id}`,
                    text: `${type.name}`
                  }
                ))}
              />
        }
        
      </Form.Field>
    </>
  )
}

export default CharacterId;