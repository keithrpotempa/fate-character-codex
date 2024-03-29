import React, { useState, useEffect } from "react";
import { Container, Dropdown } from "semantic-ui-react";
import { useFateRules } from "../../hooks/useFateRules";
import TypeList from "../character/types/TypeList";

/*
  This is a parent component of the type list,
  ~~it retrieves the stunts,~~ handles filters
  and passes them down to the list to render
*/
const Types = props => {
  const { characterTypes, characterSubTypes } = useFateRules();

  const [filteredSubTypes, setFilteredSubTypes] = useState([]);
  const [filter, setFilter] = useState("")

  const handleFilterChange = (evt, {name, value}) => {
    setFilter(value);
  }

  useEffect(() => {
    const filterSubTypes = () => {
      const filteredSubTypes = characterSubTypes
        .filter(subtype => subtype.characterTypeId === parseInt(filter));
      setFilteredSubTypes(filteredSubTypes);
    }

    if (filter !== "") {
      filterSubTypes();
    }
  }, [filter, characterSubTypes])

  return (
    <>
      <Container>
        <div className="header-container">
          <h1>Character Types</h1>
        </div>
        <div className="filter-div">
          <Dropdown
            clearable 
            selection
            onChange={handleFilterChange}
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
        </div>
        <TypeList 
          filteredSubTypes={
            filter !== ""
              ? filteredSubTypes 
              : characterSubTypes
          }
        />
      </Container>
    </>
  )


}

export default Types