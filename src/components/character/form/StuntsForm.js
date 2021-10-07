import React, { useState } from "react";
import { Divider, Grid } from "semantic-ui-react";

import "../Character.css";
import StuntRow from "./StuntRow";
import { useFateRules } from "../../../hooks/useFateRules";

// TODO: Refactor this and all of its children
const StuntsForm = ({
  characterStunts,
  setCharacterStunts,
  characterSubType: {
    name,
    maxStunts,
    stuntComment,
  }
}) => {

  const { skillList , stuntList} = useFateRules();

  const [ filteredStuntList, setFilteredStuntList ] = useState(stuntList);

  const createStuntRow = () => {
    let stuntRows = [];
    for (let i = 0; i <= maxStunts; i++) {
      stuntRows.push(
        <StuntRow 
          key={`stunt-${i}`}
          x={`${i}`}
          stuntList={filteredStuntList} 
          setStuntList={setFilteredStuntList} 
          characterStunts={characterStunts} 
          setCharacterStunts={setCharacterStunts} 
          skillList={skillList}
        />
      )
    }
    return stuntRows;
  }

  return (
    <>
      <Divider horizontal><h2>STUNTS</h2></Divider>
        <Grid columns={2}>
          <Grid.Column width={10}>
            {/* If a character subtype requires no stunts,
              do not render the component for them to choose one */}
            {maxStunts > 0
              ? <>
                  <p>(choose a skill to filter by)</p>
                  {createStuntRow()}
                </>
              : <></>
            }
          </Grid.Column>
          <Grid.Column width={6}>
            {/* TODO: make this look cleaner on render */}
            <h3>Stunts for {name}</h3>
            <p>{stuntComment}</p>
          </Grid.Column>
        </Grid>
    </>
  )
}

export default StuntsForm;