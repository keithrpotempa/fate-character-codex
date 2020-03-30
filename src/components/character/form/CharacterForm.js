import React, { useState, useEffect } from "react";
import { Container, Divider, Form } from "semantic-ui-react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";
import StuntsForm from "./StuntsForm";
import SaveCharacter from "./SaveCharacter";

// DO NOT USE OR EDIT: THIS FORM HAS DEPRECATED
// This is the old single page form, before it was stepped

const CharacterForm = props => {
  // All the state for the character form is here, in the parent component
  // but modified by the handleFieldChange functions of the children components
  const [character, setCharacter] = useState({name: ""});

  // Seeding a default array of aspects
  // presently with their types (currently) hard coded
  const [characterAspects, setCharacterAspects] = useState([
    { name: "", aspectTypeId: 1 },
    { name: "", aspectTypeId: 2 },
    { name: "", aspectTypeId: 3 },    
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 },
    { name: "", aspectTypeId: 3 }
  ])
  const [characterSkills, setCharacterSkills] = useState({
    6: [],
    5: [],
    4: [],
    3: [],
    2: [],
    1: []
  });
  const [skillList, setSkillList] = useState([]);
  const [stuntList, setStuntList] = useState([]);  
  const [characterStunts, setCharacterStunts] = useState({
    5: "",
    4: "",
    3: "",
    2: "",
    1: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  // skillList had to be "lifted" because it is needed by
  // both SkillsForm and StuntsForm child components
  const getSkillList = () => {
    return ApiManager.getAll("skills")
      .then(setSkillList);      
  }

  const getStuntList = () => {
    return ApiManager.getAll("stunts")
      .then(setStuntList); 
  }

  // Note: Most field changes are handled 
  // by their respective child components
  const handleFieldChange = evt => {
    const stateToChange = {...character};
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange)
  }

  /* ------------------ EDIT RELATED ------------------  */
  const editSetup = () => {
    // If this is an edit, the following needs to happen:
    const characterId = props.match.params.characterId
    // Get the character and put them in state
    ApiManager.get("characters", characterId)
      .then(character => setCharacter(character))
      // Get their aspects and put them in state
    ApiManager.getCharacterAspects(characterId)
      .then(aspects => setAspectsToEdit(aspects))
    ApiManager.getCharacterSkills(characterId)
      .then(skills => setSkillsToEdit(skills))
    ApiManager.getCharacterStunts(characterId)
      .then(stunts => setStuntsToEdit(stunts))
  }

  const setAspectsToEdit = (aspects) => {
    const stateToChange = [...characterAspects];
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 0; i < 7; i++) {
      const aspect = aspects[i]
      if (aspect) {
        stateToChange[i] = {name: aspect.name, aspectTypeId: aspect.aspectTypeId}
      }
    } 
    setCharacterAspects(stateToChange)
  }

  const setSkillsToEdit = (skills) => {
    const stateToChange = {...characterSkills};
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 1; i < 7; i++) {
      stateToChange[i] = skillsByRating(skills, i)
    } 
    setCharacterSkills(stateToChange)
  }

  const setStuntsToEdit = (stunts) => {
    const stateToChange = {...characterStunts};
    // TODO: Make this loop more adaptable to different range of stunt numbers
    stunts.forEach(function(stunt, index) {
      if (stunt.stuntId !== "0") {
        return stateToChange[ index + 1] = stunt.stuntId.toString();       
      }
    }) 
    setCharacterStunts(stateToChange)
  }

  const skillsByRating = (skills, rating) => {
    // Converting the format of the db to the format of the form's state
    const filteredSkills = skills.filter(skill => skill.skillRating === rating)
    const formattedSkills = filteredSkills.map(skill => skill.skillId.toString())
    return formattedSkills;
  }

  /* ------------------ ------------------  */

  useEffect(() => {
    getSkillList();
    // AKA: if this is an edit
    if (props.match.params.characterId) {
      editSetup();
    }
    setIsLoading(false);
  }, [])

  return (
    <>
      <Container text>
        <Form>
          <Form.Field>
            <label htmlFor="characterName">Name</label>
            <Form.Input 
              type="text"
              required
              onChange={handleFieldChange}
              className="character"
              id="name"
              placeholder="Character name"
              value={character.name}
            />
            <AspectForm 
              aspects={characterAspects}
              setAspects={setCharacterAspects}
            />
            <SkillsForm 
              skillList={skillList}
              setSkillList={setSkillList}
              characterSkills={characterSkills}
              setCharacterSkills={setCharacterSkills}
            />
            <StuntsForm
              characterStunts={characterStunts}
              setCharacterStunts={setCharacterStunts}
              stuntList={stuntList}
              skillList={skillList}
            />
            <SaveCharacter 
              character={character}
              aspects={characterAspects}
              skills={characterSkills}
              stunts={characterStunts}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              {...props}
            />
          </Form.Field>
        </Form>
      </Container>
    </>
  )

}

export default CharacterForm;