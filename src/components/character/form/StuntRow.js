import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import StuntsDropdown from "./StuntsDropdown";
import StuntDescription from "./StuntsDescription";
import SkillsDropDown from "./SkillsDropDown";

const StuntRow = ({
  x,
  skillList,
  stuntList,
  setStuntList,
  characterStunts,
  setCharacterStunts,
}) => {
  const [filter, setFilter] = useState("")

  const handleFilter = (evt, {name, value}) => {
    // Blank values (from utilizing the clearable x)
    // set the filter back to its default state
    if (!value) {
      setFilter("")
    } else {
      const valueToSet = parseInt(value)
      setFilter(valueToSet)
    }
  }

  return (
    <>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <SkillsDropDown 
              x={x} 
              handleFieldChange={handleFilter} 
              skillList={skillList}
              />
          </Grid.Column>
          <Grid.Column>
            <StuntsDropdown 
              x={x} 
              stuntList={stuntList} 
              setStuntList={setStuntList} 
              characterStunts={characterStunts} 
              setCharacterStunts={setCharacterStunts} 
              filter={filter}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <StuntDescription 
              selectedStunt={characterStunts[x]} 
              stuntList={stuntList}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default StuntRow;