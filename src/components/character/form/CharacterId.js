import React from "react";
import { Divider, Dropdown, Form, Label } from "semantic-ui-react";
import { useFateRules } from "../../../hooks/useFateRules";
import TypeDetail from "../../pages/TypeDetail";

const CharacterId = ({
  character,
  setCharacterName,
  characterType,
  setCharacterType,
  characterSubType,
  setCharacterSubType,
  characterInProgress,
  resetCharacter,
}) => {

  const {
    characterTypes,
    characterSubTypes,
  } = useFateRules();

  const handleNameFieldChange = (evt, {value}) => {
    setCharacterName(value);
  }

  const handleTypeFieldChange = (evt, {name, value}) => {
    // If they're a PC, set their subtype for them
    // (there's no subtype for PCs)
    // Otherwise, wipe any chosen subtype
    if (value === 0) {
      // TODO: make this less dependent on being hard-coded
      setCharacterSubType(5) // 5 is the PC subtype
    } else {
      // If they're changing the character's type, 
      // clear any chosen subtype info
      setCharacterSubType("")
    }
    setCharacterType(value);
  }

  const handleSubTypeFieldChange = (evt, {value}) => {
    if (characterInProgress()) {
      resetCharacter();
    }
    setCharacterSubType(value);
  }

  return (
    <>
      <Divider horizontal><h2>ID</h2></Divider>
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
      </Form.Field>
      <Form.Field>
        <Dropdown 
          required
          selection
          onChange={handleTypeFieldChange}
          className="type"
          name="type"
          id="type"
          placeholder="Character type"
          value={characterType}
          options={characterTypes?.map(type => (
            {
              key: `type-${type.id}`,
              value: type.id,
              text: `${type.name}`
            }
          ))}
        />
        {// Don't display this option until a type is chosen
          // And don't display it if they're a PC (no additional choice necessary)
          character.type === "" || character.type === "0"
            ? <></>
            : <Dropdown 
                required
                selection
                onChange={handleSubTypeFieldChange}
                className="subtype"
                name="subtype"
                id="subtype"
                placeholder="Character Subtype"
                value={characterSubType}
                options={characterSubTypes
                  ?.filter(subtype => subtype.characterTypeId === parseInt(characterType))
                  .map(type => (
                  {
                    key: `type-${type.id}`,
                    value: type.id,
                    text: `${type.name}`
                  }
                ))}
              />
        }
      </Form.Field>
      {/* If they've already entered character information, 
        warn them about changing character subtype
        TODO: Make this a confirmation dialogue; that attempt was abandoned */}
      {characterInProgress() 
        ? <Label basic color="red" pointing>
            Changing character types or subtypes clears any character information already entered.
          </Label>
        : <></>
      }
      {
        character.characterSubtypeId !== ""
        ? <TypeDetail 
            verbose={false}
            subTypeId={parseInt(character.characterSubtypeId)}
          />
        : <></>
      }
    </>
  )
}

export default CharacterId;