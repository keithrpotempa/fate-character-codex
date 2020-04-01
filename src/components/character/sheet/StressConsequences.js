import React from "react";
import { Grid } from "semantic-ui-react";
import StressBoxes from "./StressBoxes";
import ConsequenceInputs from "./ConsequenceInputs";
import "../Character.css";

const StressConsequences = props => {
  const characterSubType = props.characterSubType;
  const type = characterSubType.name;
  const stressMax = characterSubType.stressMax; 
  const bothStressTypes = characterSubType.bothStressTypes;
  const stressComment = characterSubType.stressComment;
  const maxConsequence = characterSubType.maxConsequence;
  const consequenceComment = characterSubType.consequenceComment;

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
          <Grid.Column width={6}>
            {/* If the character has both stress types, 
              render both types of stress boxes 
              otherwise, render one generic set 
              and pass the highest skill rating */}
            {bothStressTypes 
              ? <>
                  <StressBoxes 
                    stressType="physical" 
                    skillRating={props.physiqueRating}
                    stressMax={stressMax}
                    bothStressTypes={bothStressTypes}
                    type={type}
                    stressComment={stressComment}
                  />
                  <StressBoxes 
                    stressType="mental" 
                    skillRating={props.willRating}
                    stressMax={stressMax}
                    bothStressTypes={bothStressTypes}
                    type={type}
                    stressComment={stressComment}
                  />
                </>
              : <StressBoxes 
                  stressType="" 
                  skillRating={props.physiqueRating > props.willRating  
                    ? props.physiqueRating
                    : props.willRating
                  }
                  stressMax={stressMax}
                  bothStressTypes={bothStressTypes}
                  type={type}
                  stressComment={stressComment}
                />
            }    
          </Grid.Column>
          <Grid.Column width={10}>
            <ConsequenceInputs 
              willRating={props.willRating} 
              physiqueRating={props.physiqueRating}
              type={type}
              maxConsequence={maxConsequence}
              consequenceComment={consequenceComment}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

export default StressConsequences