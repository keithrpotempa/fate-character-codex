import React, { useState, useEffect } from "react";
import { Container, Dropdown } from "semantic-ui-react"
import { useFateRules } from "../../hooks/useFateRules";
import StuntList from "./StuntList"

// This is a parent component of StuntList
// ~~it retrieves the stunts,~~ handles filters
// and passes them down to StuntList to render

// TODO: Might be able to collapse this into stunt list now that 
// the lists are coming from props
const Stunts = props => {
  const { skillList, stuntList } = useFateRules();

  const [filteredStunts, setFilteredStunts] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (evt, {name, value}) => {
    setFilter(value);
  }

  useEffect(() => {
    const filterStunts = () => {
      const filteredStuntList = stuntList
        .filter(stunt => stunt.skillId === parseInt(filter))
      setFilteredStunts(filteredStuntList)
    }

    if (filter !== "") {
      filterStunts();
    }
  }, [filter, stuntList])

  return (
    <>
      <Container>
        <div className="header-container">
          <h1>Stunts</h1>
        </div>
        <div className="filter-div">
          <Dropdown
            clearable 
            selection
            onChange={handleFilterChange}
            className="skill"
            name="skill"
            id="skill"
            placeholder="Filter by skill"
            value={filter}
            options={skillList.map(skill => (
              {
                key: `skills-${skill.id}`,
                value: `${skill.id}`,
                text: `${skill.name}`
              }
            ))}
          />
        </div>
        <StuntList
          key="stuntlist" 
          stunts={ 
            filter !== ""
              ? filteredStunts
              : stuntList
          } 
          skills={skillList}
        />
      </Container>
    </>
  )
}

export default Stunts