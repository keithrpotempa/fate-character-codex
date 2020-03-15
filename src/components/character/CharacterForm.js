import React, { useState, useEffect } from "react";
// import ApiManager from "../../modules/ApiManager";
import "./Character.css";

const CharacterForm = props => {
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // TODO: likely have state for all the various attributes of a character


  const handleFieldChange = evt => {
    const stateToChange = {...character};
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange);
  }

  const constructCharacter = evt => {
    //TODO: make this
  }

  const saveCharacter = evt => {
    //TODO: make this
  }

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return (
    <>
      <form>
        <fieldset>
          <input 
            type="text"
            required
            onChange={handleFieldChange}
            id="name"
            placeholder="Character name"
          />
        </fieldset>
      </form>
    </>
  )

}

export default CharacterForm;