import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Button, Divider, Grid } from "semantic-ui-react";


const SteppedFormControls = ({ 
  isLoading,
  step,
  handleStepItemClick,
  handleNextButtonClick,
  handlePreviousButtonClick,
  handleSaveAll,
  children,
}) => {
  return (
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
            onClick={handleStepItemClick}
          />
          <Menu.Item
            name='aspects'
            index={2}
            active={step === 2}
            onClick={handleStepItemClick}
          />
          <Menu.Item
            name='skills'
            index={3}
            active={step === 3}
            onClick={handleStepItemClick}
          />
          <Menu.Item
            name='stunts'
            index={4}
            active={step === 4}
            onClick={handleStepItemClick}
          />
          <Menu.Item
            name='review'
            index={5}
            active={step === 5}
            onClick={handleStepItemClick}
          />
        </Menu>
      </Grid.Column>
      <Grid.Column width={10}>
        <Divider horizontal>
          <h1>CHARACTER FORM</h1>
        </Divider>
        {/* Renders the form for whatever step we're on */}
        {children}
        <div className="flex-end">
          {/* Don't render a "previous button on step 1 */}
          {step !== 1
            ? <Button
                type="button"
                value="previous"
                // disabled={isLoading}
                onClick={handlePreviousButtonClick}
              >
                Previous
              </Button>
            : <></>
          }
          {/* If it's the last step, change the button to "submit" */}
          {step !== 5
            ? <Button
                type="button"
                value="next"
                // disabled={isLoading}
                onClick={handleNextButtonClick}
              >
              Next
            </Button>
            : <Button
                type="button"
                value="save"
                disabled={isLoading}
                onClick={handleSaveAll}
              >
                SAVE
              </Button>
          }
        </div>
      </Grid.Column>
    </Grid>
  )
}

export default SteppedFormControls;