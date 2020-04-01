import React, { useEffect, useState } from "react";
import { Divider, Dropdown, Form, Message } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
import TypeDetail from "../types/TypeDetail";

const CharacterId = props => {
  const character = props.character; 
  const setCharacterSubTypeDetails = props.setCharacterSubTypeDetails;
  const resetCharacter = props.resetCharacter;
  const characterInProgress = props.characterInProgress;
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

  // Once a character subtype is chosen, 
  // store all that subtype's details in state
  // on the parent component (mainform)
  // to be used by subsequent form components
  const getCharacterSubtypeDetails = subtypeId => {
    const subtype = characterSubTypeList
      .filter(subtype => subtype.id === subtypeId)[0]
    setCharacterSubTypeDetails(subtype);
  }

  const handleNameFieldChange = (evt, {name, value}) => {
    const stateToChange = {...character};
    stateToChange[name] = value;
    props.setCharacter(stateToChange)
  }

  const handleTypeFieldChange = (evt, {name, value}) => {
    const stateToChange = {...character};
    stateToChange[name] = value;
    // If they're a PC, set their subtype for them
    // (there's no subtype for PCs)
    // Otherwise, wipe any chosen subtype
    if (value === "1") {
      stateToChange["subtype"] = "6";
    } else {
      stateToChange["subtype"] = "";
    }
    props.setCharacter(stateToChange)
  }

  const handleSubTypeFieldChange = (evt, {name, value}) => {
    if (characterInProgress()) {
      resetCharacter();
    }
    const stateToChange = {...character};
    stateToChange[name] = value;
    // Set subtype details in state
    getCharacterSubtypeDetails(parseInt(value))
    props.setCharacter(stateToChange)
  }

  useEffect(() => {
    getCharacterTypeList();
    getCharacterSubTypeList();
    getCharacterSubtypeDetails();
  }, [])

  return (
    <>
      <Divider horizontal><h2>ID</h2></Divider>
      {/* If they've already entered character information, 
          warn them about changing character subtype
        TODO: Make this a confirmation dialogue; that attempt was abandoned */}
      {characterInProgress() 
          ? <Message>
              <Message.Header>Warning</Message.Header>
              <p>
                Changing character subtypes clears any character information already entered.
              </p>
            </Message>
          : <></>
        }
      <Form.Field>
        <label htmlFor="characterName">Name</label>
        <Form.Input 
          type="text"
          required
          onChange={handleNameFieldChange}
          className="character"
          name="name"
          id="name"
          placeholder="Character name"
          value={character.name}
        />
        <Dropdown 
          required
          selection
          onChange={handleTypeFieldChange}
          className="type"
          name="type"
          id="type"
          placeholder="Character type"
          value={character.type}
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
                onChange={handleSubTypeFieldChange}
                className="subtype"
                name="subtype"
                id="subtype"
                placeholder="Character Subtype"
                value={character.subtype}
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