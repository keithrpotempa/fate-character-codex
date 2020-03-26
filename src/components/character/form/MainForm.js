import React, { useState, useEffect } from "react";
import { Button, Container, Divider, Grid } from "semantic-ui-react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";
import StuntsForm from "./StuntsForm";
import SaveCharacter from "./SaveCharacter";
import SheetReview from "./SheetReview";
import CharacterId from "./CharacterId";
import { Menu } from 'semantic-ui-react'
import EditCharacter from "./EditCharacter";

const MainForm = props => {
  /* ------------------ STATES ------------------*/
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);

  const [skillList, setSkillList] = useState([]);
  const [stuntList, setStuntList] = useState([]);

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

  const [characterStunts, setCharacterStunts] = useState({
    5: "",
    4: "",
    3: "",
    2: "",
    1: ""
  });


  /* ------------------ GETS & STATE SETS  ------------------*/
  const getSkillList = () => {
    return ApiManager.getAll("skills")
      .then(setSkillList);      
  }

  const getStuntList = () => {
    return ApiManager.getAll("stunts")
      /* Sorting stunts alphabetically
        https://stackoverflow.com/a/45544166*/
      .then(stuntList => stuntList.sort((a, b) => a.name.localeCompare(b.name) ))
      .then(setStuntList); 
  }


  // Note: Most field changes are handled 
  // by their respective child components
  const handleFieldChange = evt => {
    const stateToChange = {...character};
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange)
  }

  const handleItemClick = (evt, {index}) => {
    setStep(index);
  }

  // Helpful links:
  // https://www.digitalocean.com/community/tutorials/how-to-create-multistep-forms-with-react-and-semantic-ui
  const renderStep = () => {
    switch(step){
      default: 
        return <CharacterId 
          character={character} 
          handleFieldChange={handleFieldChange}
        />
      case 2: 
        return <AspectForm
          aspects={characterAspects}
          setAspects={setCharacterAspects}
        />
      case 3: 
        return <SkillsForm 
          skillList={skillList}
          setSkillList={setSkillList}
          characterSkills={characterSkills}
          setCharacterSkills={setCharacterSkills}
        />
      case 4: 
        return <StuntsForm
          characterStunts={characterStunts}
          setCharacterStunts={setCharacterStunts}
          skillList={skillList}
          stuntList={stuntList}
          setStuntList={setStuntList}
        />
      case 5:
        return <>
            <Divider horizontal><h1>Review and Save</h1></Divider>
            <SheetReview
              character={character}
              aspects={characterAspects}
              skills={characterSkills}
              stunts={characterStunts}
              skillList={skillList}
              stuntList={stuntList}
            />
        </>
    }
  }

  useEffect(() => {
    getSkillList();
    getStuntList();
    // AKA: if this is an edit
    if (props.match.params.characterId) {
      ApiManager.get("characters", props.match.params.characterId)
        .then(character => setCharacter(character))
    }
    setIsLoading(false);
  }, [])

  return (
    <>
      <Container>
        {/* If this is an edit, render the component that 
          retrieves all the characters' data */}
        {props.match.params.characterId
          ? <EditCharacter 
            characterId={props.match.params.characterId}
            setCharacter={setCharacter}
            characterAspects={characterAspects}
            setCharacterAspects={setCharacterAspects}
            characterSkills={characterSkills}
            setCharacterSkills={setCharacterSkills}
            characterStunts={characterStunts}
            setCharacterStunts={setCharacterStunts}
            setIsLoading={setIsLoading}
          />
          : <></>
        }
        <Grid columns={2}>
          <Grid.Column width={3}>
            <Menu inverted pointing compact vertical 
              size="large" 
              color="blue"
            >
              <Menu.Item
                name='details'
                index={1}
                active={step === 1}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='aspects'
                index={2}
                active={step === 2}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='skills'
                index={3}
                active={step === 3}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='stunts'
                index={4}
                active={step === 4}
                onClick={handleItemClick}
              />
              <Menu.Item
                name='review'
                index={5}
                active={step === 5}
                onClick={handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column width={10}>
            <Divider horizontal>
              <h1>CHARACTER FORM</h1>
            </Divider>
            {/* Renders the form for whatever step we're on */}
            {renderStep()}
            {/* Don't render a "previous button on step 1 */}
            {step !== 1
              ? <Button
                  type="button"
                  // disabled={isLoading}
                  onClick={() => setStep(step-1)}
                >
                  Previous
                </Button>
              : <></>
            }
            {/* If it's the last step, change the button to "submit" */}
            {step !== 5
              ? <Button
                  type="button"
                  // disabled={isLoading}
                  onClick={() => setStep(step+1)}
                >
                Next
              </Button>
              : <SaveCharacter
                  character={character}
                  aspects={characterAspects}
                  skills={characterSkills}
                  stunts={characterStunts}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  {...props}
                />
            }
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}

export default MainForm;