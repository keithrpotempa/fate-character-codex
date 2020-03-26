import React, { useState, useEffect } from "react";
import { Divider } from "semantic-ui-react";

import StuntRow from "./StuntRow";
import "../Character.css";

const StuntsForm = props => {
  const setCharacterStunts = props.setCharacterStunts;
  const characterStunts = props.characterStunts;
  const stuntList = props.stuntList;
  const setStuntList = props.setStuntList;

  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  const [filter3, setFilter3] = useState("");
  const [filter4, setFilter4] = useState("");
  const [filter5, setFilter5] = useState("");

  // FIXME: ??
  useEffect(() => {
  
  }, [filter1, filter2, filter3, filter4, filter5])

  // TODO: Make this DRY
  return (
    <>
      <Divider horizontal><h2>STUNTS</h2></Divider>
      <p>(choose a skill to filter by)</p>
      <StuntRow 
        x="1" 
        filter={filter1} 
        setFilter={setFilter1} 
        stuntList={stuntList} 
        setStuntList={setStuntList} 
        characterStunts={characterStunts} 
        setCharacterStunts={setCharacterStunts} 
        skillList={props.skillList}
      />
      <StuntRow 
        x="2" 
        filter={filter2} 
        setFilter={setFilter2} 
        stuntList={stuntList} 
        setStuntList={setStuntList} 
        characterStunts={characterStunts} 
        setCharacterStunts={setCharacterStunts} 
        skillList={props.skillList}
      />
      <StuntRow 
        x="3" 
        filter={filter3} 
        setFilter={setFilter3} 
        stuntList={stuntList} 
        setStuntList={setStuntList} 
        characterStunts={characterStunts} 
        setCharacterStunts={setCharacterStunts} 
        skillList={props.skillList}
      />
      <StuntRow 
        x="4" 
        filter={filter4} 
        setFilter={setFilter4} 
        stuntList={stuntList} 
        setStuntList={setStuntList} 
        characterStunts={characterStunts} 
        setCharacterStunts={setCharacterStunts} 
        skillList={props.skillList}
      />
      <StuntRow 
        x="5" 
        filter={filter5} 
        setFilter={setFilter5} 
        stuntList={stuntList} 
        setStuntList={setStuntList} 
        characterStunts={characterStunts} 
        setCharacterStunts={setCharacterStunts} 
        skillList={props.skillList}/>
    </>
  )
}

export default StuntsForm;