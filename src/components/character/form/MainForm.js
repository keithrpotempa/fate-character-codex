import React, { useState, useEffect } from "react";
import { Button, Container, Divider, Grid } from "semantic-ui-react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";
import StuntsForm from "./StuntsForm";
import SaveCharacter from "./SaveCharacter";
import SheetPreview from "../sheet/SheetPreview";
import CharacterId from "./CharacterId";
import { Menu } from 'semantic-ui-react'

const MainForm = props => {
  /* ------------------ STATES ------------------*/
  const [isLoading, setIsLoading] = useState(true);

  const [character, setCharacter] = useState({name: ""});
  const [step, setStep] = useState(1);

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
  /* ------------------  ------------------*/

  // skillList had to be "lifted" because it is needed by
  // both SkillsForm and StuntsForm child components
  const getSkillList = () => {
    return ApiManager.getAll("skills")
      .then(setSkillList);      
  }

  const [skillList, setSkillList] = useState([]);

  // Note: Most field changes are handled 
  // by their respective child components
  const handleFieldChange = evt => {
    const stateToChange = {...character};
    console.log(stateToChange)
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange)
  }

  const handleItemClick = (evt, {index}) => {
    setStep(index)
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
        />
      case 5:
        return <>
            <Divider horizontal><h1>Review and Save</h1></Divider>
            <SheetPreview
              character={character}
              aspects={characterAspects}
              skills={characterSkills}
              stunts={characterStunts}
              //FIXME:
              physiqueRating={0}
              willRating={0}
            />
        </>
    }
  }

  // TODO: isLoading?
  useEffect(() => {
    getSkillList();
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
        <Divider horizontal>
          <h1>CHARACTER FORM</h1>
        </Divider>
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
          <Grid.Column>
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