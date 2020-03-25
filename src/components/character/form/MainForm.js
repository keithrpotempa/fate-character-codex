import React, { useState, useEffect } from "react";
import { Button, Container, Divider, Grid } from "semantic-ui-react";
import "../Character.css";
import ApiManager from "../../../modules/ApiManager";
import AspectForm from "./AspectsForm";
import SkillsForm from "./SkillsForm";
import StuntsForm from "./StuntsForm";
import SaveCharacter from "./SaveCharacter";
import CharacterId from "./CharacterId";
import { Menu } from 'semantic-ui-react'

const MainForm = props => {
  const [character, setCharacter] = useState({name: ""});
  const [step, setStep] = useState(1);

  // Note: Most field changes are handled 
  // by their respective child components
  const handleFieldChange = evt => {
    const stateToChange = {...character};
    stateToChange[evt.target.id] = evt.target.value;
    setCharacter(stateToChange)
  }

  const handleItemClick = (evt, {index}) => {
    setStep(index)
  }

  const renderStep = () => {
    switch(step){
      default: 
        return <CharacterId character={character}/>
      case 2: 
        return <p> Aspect Form </p>
      case 3: 
        return <p> Skills Form </p>
      case 4: 
        return <p> Stunts Form </p>
      case 5:
        return <p> Review and Save Character </p>
    }
  }

  // TODO: isLoading?
  useEffect(() => {
    // AKA: if this is an edit
    if (props.match.params.characterId) {
      ApiManager.get("characters", props.match.params.characterId)
        .then(character => setCharacter(character))
    }
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
            {/* Don't render a previous button on step 1 */}
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
            <Button
              type="button"
              // disabled={isLoading}
              onClick={() => setStep(step+1)}
            >
            Next
          </Button>
          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}

export default MainForm;