import React, { useEffect, useState } from "react";
import { Card, Divider, Dropdown, Form } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
import TypeDetail from "../types/TypeDetail";

const CharacterId = props => {
  const character = props.character; 
  const [characterTypeList, setCharacterTypeList] = useState([]);
  const [characterSubTypeList, setCharacterSubTypeList] = useState([]);
  
  const getCharacterTypeList = () => {
    return ApiManager.getAll("characterTypes")
      .then(setCharacterTypeList)
  }

  const getCharacterSubTypeList = () => {
    return ApiManager.getAll("characterSubTypes")
      .then(setCharacterSubTypeList)
  }

  const handleFieldChange = (evt, {name, value}) => {
    const stateToChange = {...character};
    stateToChange[name] = value;
    // If they're a PC, set their subtype for them
    // (there's no subtype for PCs)
    // TODO: this could evade validation if they select PC first,
    // then choose an NPC and leave the subtype blank 
    // (it will still be set to subtype PC)
    if (value === "1" && name === "type") {
      stateToChange["subtype"] = "6";
    }
    props.setCharacter(stateToChange)
  }

  useEffect(() => {
    getCharacterTypeList();
    getCharacterSubTypeList();
  }, [character])

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
          options={characterTypeList.map(type => (
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
                options={characterSubTypeList
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
        {
          character.subtype === ""
          ? <></>
          : <TypeDetail 
              verbose={false}
              subTypeId={parseInt(character.subtype)}
            />
        }


        
      </Form.Field>
    </>
  )
}

export default CharacterId;