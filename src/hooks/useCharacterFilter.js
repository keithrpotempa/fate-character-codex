import { useState, useEffect } from "react";

export const useCharacterFilter = (characters, characterSubTypesByType) => {
  /* State related to the filter dropdowns */ 
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [filter, setFilter] = useState({type: "", subtype: ""})

  const handleFilterFieldChange = (evt, {name, value}) => {
    const stateToChange = {...filter};
    stateToChange[name] = value;
    // If they're a PC, set their subtype for them
    // (there's no subtype for PCs)
    // Otherwise, wipe any chosen subtype
    if (name === "type") {
      if (value === "0") { // Kludge: but 0 is the PC typeId
        stateToChange["subtype"] = "5"; // Kludge: but 5 is the PC subTypeId
        // If they're changing the character's type, 
        // clear any chosen subtype info
      }
      else {
        stateToChange["subtype"] = "";
      }
    }
    setFilter(stateToChange);
  }

  useEffect(() => {
    const filterByType = (typeId, characterList) => {
      // A list of subType ids
      const subTypesInType = characterSubTypesByType[typeId]
      // Filtering out characters whose characterSubTypeId is not in our list of subtypeIds within the chosen type  
      return characterList.filter((character) => subTypesInType.includes(character.characterSubTypeId))
    }
  
    const filterBySubType = (subTypeId, characterList) => {
      return characterList.filter(character => character.characterSubTypeId === parseInt(subTypeId))
    }

    if (filter.type !== "" || filter.subtype !== "") {
      let filteredCharacterList = characters;
      if (filter.type !== "") {
        filteredCharacterList = filterByType(filter.type, filteredCharacterList)
      }
      if (filter.subtype !== "") {
        filteredCharacterList = filterBySubType(filter.subtype, filteredCharacterList)
      }
      setFilteredCharacters(filteredCharacterList);    
    }
  }, [filter, characters, characterSubTypesByType])

  return {
    filter,
    filteredCharacters,
    handleFilterFieldChange,
  }
}