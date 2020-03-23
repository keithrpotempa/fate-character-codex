import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import StressBoxes from "./StressBoxes";
import ConsequenceInputs from "./ConsequenceInputs";
import "../Character.css";

const StressConsequences = props => {
  const physiqueRating = props.physiqueRating;
  const willRating = props.willRating;

  return (
    <>
      <Grid columns={2} stackable>
        <Grid.Row stretch>
          <Grid.Column width={4}>
              <StressBoxes stressType="physical" skillRating={physiqueRating}/>
              <StressBoxes stressType="mental" skillRating={willRating}/>
          </Grid.Column>
          <Grid.Column width={10}>
            <ConsequenceInputs 
              willRating={willRating} 
              physiqueRating={physiqueRating}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  )
}

/*

      <div className="flex-rows">
          <div className="stress-container">
            <p><strong>Physical Stress</strong></p>
            <div className="stress-boxes-container">
              <StressBoxes stressType="physical" skillRating={physiqueRating}/>
            </div>
          </div>
          <div className="stress-container">
            <p><strong>Mental Stress</strong></p>
            <div className="stress-boxes-container">
              <StressBoxes stressType="mental" skillRating={willRating}/>
            </div>
          </div>
          <div className="stress-container">
            <div className="consequences-container">
              <ConsequenceInputs 
                willRating={willRating} 
                physiqueRating={physiqueRating}
              />
            </div>
          </div>
      </div>

*/

export default StressConsequences