import React from "react";
import { Grid } from "semantic-ui-react";
import StressBoxes from "./StressBoxes";
import ConsequenceInputs from "./ConsequenceInputs";
import "../Character.css";

const StressConsequences = ({
  characterType,
  characterSubType: {
    stressMax,
    bothStressTypes,
    stressComment,
    maxConsequence,
    consequenceComment,
  },
  physiqueRating,
  willRating,
}) => {

  /* 
    This component renders:
    the stress checkboxes
    consequence inputs
    for character preview
  */

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
                    skillRating={physiqueRating}
                    stressMax={stressMax}
                    bothStressTypes={bothStressTypes}
                    type={characterType}
                    stressComment={stressComment}
                  />
                  <StressBoxes 
                    stressType="mental" 
                    skillRating={willRating}
                    stressMax={stressMax}
                    bothStressTypes={bothStressTypes}
                    type={characterType}
                    stressComment={stressComment}
                  />
                </>
              : <StressBoxes 
                  stressType="" 
                  skillRating={physiqueRating > willRating  
                    ? physiqueRating
                    : willRating
                  }
                  stressMax={stressMax}
                  bothStressTypes={bothStressTypes}
                  type={characterType}
                  stressComment={stressComment}
                />
            }    
          </Grid.Column>
          <Grid.Column width={10}>
            <ConsequenceInputs 
              willRating={willRating} 
              physiqueRating={physiqueRating}
              type={characterType}
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