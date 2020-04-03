import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { confirmAlert } from 'react-confirm-alert';
import { Card, Button, Icon, Container, Dropdown } from "semantic-ui-react"
import CharacterCard from "./CharacterCard";
import ApiManager from "../../modules/ApiManager";

const CharacterList = props => {
  const activeUser = JSON.parse(sessionStorage.getItem("credentials"));
  const [characters, setCharacters] = useState([]);

  /* State related to the filter dropdowns */ 
  const [characterTypes, setCharacterTypes] = useState([]);
  const [characterSubTypes, setCharacterSubTypes] = useState([]);
  const [filter, setFilter] = useState({type: "", subtype: ""})

  /* State related to pagination 
  reference: https://www.npmjs.com/package/react-hooks-paginator
  */
  const pageLimit = 9;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  const getCharacters = () => {
    ApiManager.getCharacterList()
      .then(setCharacters)
  }

  const getHighConcept = (character) => {
    const aspects = character.characterAspects;
    /* 
      Filter out everything that isn't 
      a High Concept (type of 1)
      Return the .name property of the only aspect
      remaining in the array  
      (there's only ever one High Aspect)
    */
    const highConcept = aspects.filter(aspect => {
      return aspect.aspectTypeId === 1;
    })[0].name
    return highConcept;
  }

  const getCharacterTypeList = () => {
    return ApiManager.getAll("characterTypes")
      .then(setCharacterTypes)
  }

  const getCharacterSubTypeList = () => {
    return ApiManager.getAll("characterSubTypes")
      .then(setCharacterSubTypes)
  }

  const handleFilterFieldChange = (evt, {name, value}) => {
    const stateToChange = {...filter};
    stateToChange[name] = value;
    // If they're a PC, set their subtype for them
    // (there's no subtype for PCs)
    // Otherwise, wipe any chosen subtype
    if (name === "type") {
      if (value === "1") {
        stateToChange["subtype"] = "6";
        // If they're changing the character's type, 
        // clear any chosen subtype info
      }
      else {
        stateToChange["subtype"] = "";
      }
    }
    setFilter(stateToChange);
  }

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
            .then(getCharacters)
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

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

  const renderCards = () => {
    /* Sorting characters alphabetically
          https://stackoverflow.com/a/45544166*/
    let characterList = currentData.sort((a,b) => a.name.localeCompare(b.name))
    if (filter.type !== "") {
      characterList = characterList
        .filter(character => character.characterSubType.characterTypeId === parseInt(filter.type))
    }
    if (filter.subtype !== "") {
      characterList = characterList
        .filter(character => character.characterSubTypeId === parseInt(filter.subtype))
    }
    return characterList.map(character => 
      <CharacterCard
        key={character.id}
        character={character}
        highConcept={getHighConcept(character)}
        handleDelete={() => handleDelete(character.id)}
        activeUser={activeUser}
      />
    )
  }

  useEffect(() => {
    getCharacters();
    getCharacterTypeList();
    getCharacterSubTypeList();
  }, [])

  useEffect(() => {
    setCurrentData(characters.slice(offset, offset + pageLimit))
  }, [offset, characters])

  return (
    <>
      <Container text>
        <Button
          type="button"
          onClick={() => {props.history.push("/characters/new")}}
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
        <div className="header-container">
          <h1>Characters</h1>
        </div>
        <div>
          <Card.Group itemsPerRow={3}>
            {renderCards()}
          </Card.Group>
          <Paginator 
            totalRecords={characters.length}
            pageLimit={pageLimit}
            pageNeighbours={2}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </Container>
    </>
  )
}

export default CharacterList