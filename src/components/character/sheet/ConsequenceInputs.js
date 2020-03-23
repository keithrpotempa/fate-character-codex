import React from "react";
import { Grid, Input, Segment } from "semantic-ui-react";

const ConsequenceInputs = props => {
  const willRating = props.willRating;
  const physiqueRating = props.physiqueRating;

  // If skill rating is 5+, they also get an extra mild consequence slot 
  const extraInputs = (stressType) => {
    let rating;
    if (stressType === "physical") {
      rating = physiqueRating
    } else if (stressType === "mental") {
      rating = willRating
    } 
    if (rating >= 5) {
      return (
        <>
          <Input label="2" placeholder={`Mild ${stressType}`}/>
        </>
      )
    }
  }

  return (
    <>
        <p><strong>CONSEQUENCES</strong></p>
        <Grid stackable>
          <Grid.Column width={6}>
            {extraInputs("physical")}
            {extraInputs("mental")}
            <Input label="2" placeholder="Mild"/>
            <Input label="4" placeholder="Moderate"/>
            <Input label="6" placeholder="Severe"/>
          </Grid.Column>
        </Grid>
    </>
  )
}

  export default ConsequenceInputs;