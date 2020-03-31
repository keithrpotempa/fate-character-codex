import React from "react";
import { Grid } from "semantic-ui-react";
import StressBoxes from "./StressBoxes";
import ConsequenceInputs from "./ConsequenceInputs";
import "../Character.css";

const StressConsequences = props => {
  /* 
    This component renders:
    the stress checkboxes
    consequence inputs
    for character preview
  */
  
  // STOPPED HERE. SHOULD THERE BE STRESS/CONSEQUENCE COMMENTS?

  return (
    <>
      <Grid columns={2} stackable>
        <Grid.Row stretched>
          <Grid.Column width={4}>
            {/* If the character has both stress types, 
              render both types of stress boxes 
              otherwise, render one generic set 
              and pass the highest skill rating */}
            {props.bothStressTypes 
              ? <>
                  <StressBoxes 
                    stressType="physical" 
                    skillRating={props.physiqueRating}
                    stressMax={props.stressMax}
                    bothStressTypes={props.bothStressTypes}
                    type={props.type}
                  />
                  <StressBoxes 
                    stressType="mental" 
                    skillRating={props.willRating}
                    stressMax={props.stressMax}
                    bothStressTypes={props.bothStressTypes}
                    type={props.type}
                  />
                </>
              : <StressBoxes 
                  stressType="" 
                  skillRating={props.physiqueRating > props.willRating  
                    ? props.physiqueRating
                    : props.willRating
                  }
                  stressMax={props.stressMax}
                  bothStressTypes={props.bothStressTypes}
                  type={props.type}
                />
            }    
          </Grid.Column>
          <Grid.Column width={10}>
            <ConsequenceInputs 
              willRating={props.willRating} 
              physiqueRating={props.physiqueRating}
              type={props.type}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default StressConsequences