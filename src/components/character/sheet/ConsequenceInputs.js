import React from "react";
import { Grid, Icon, Input, Popup } from "semantic-ui-react";

/* 
  ConsequenceInputs determines the amount of consequence inputs to render
  on a character sheet based on 
    - the character's will/physique ratings 
    - the character type's maxConsequences value
*/

const ConsequenceInputs = props => {
  const willRating = props.willRating;
  const physiqueRating = props.physiqueRating;

  const type = props.type;
  const maxConsequence = props.maxConsequence;
  const consequenceComment = props.consequenceComment;

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
      {/* If the character's type has no consequence, 
          don't render any */}
      {maxConsequence > 0 
        ? <>
            <h4>
              CONSEQUENCES
              {/* A popup explains the logic behind a character's consequences */}
              <Popup
                basic
                trigger={<Icon className="info circle large"/>}
                header={type} 
                content={
                  <>
                    <p>
                      {consequenceComment}
                    </p>
                  </>
                }
                />
            </h4>
            <Grid stackable>
              <Grid.Column width={6}>
                {/* Render extra inputs if the character's 
                    skill rating is high enough */}
                {extraInputs("physical")}
                {extraInputs("mental")}
                {/* If the consequence level exceeds the 
                  character type's maxConsequence
                  then don't render the consequence */}
                {2 <= maxConsequence
                  ? <Input label="2" placeholder="Mild"/>
                  : <></>
                }
                {4 <= maxConsequence
                  ? <Input label="4" placeholder="Moderate"/>
                  : <></>
                }
                {6 <= maxConsequence
                  ? <Input label="6" placeholder="Severe"/>
                  : <></>
                }
              </Grid.Column>
            </Grid>
          </>
          // If there's no consequences, give some indication why via the comment
        : <>
            <h4>
              CONSEQUENCES
              <Popup
                basic
                header={type}
                trigger={<Icon className="question circle large"/>} 
                content={
                  <>
                    <p>
                      {consequenceComment}
                    </p>
                  </>
                }
              />
            </h4>
      </>
      }
        
    </>
  )
}

  export default ConsequenceInputs;