import React from "react";
import { Container, Divider, Grid, Segment } from "semantic-ui-react"

import StressConsequences from "./StressConsequences";
import CharacterAspects from "./CharacterAspects";
import CharacterSkills from "./CharacterSkills";
import CharacterStunts from "./CharacterStunts";

const SheetPreview = props => {
  const character = props.character;
  const aspects = props.aspects;
  const skills = props.skills;
  const stunts = props.stunts;
  const physiqueRating = props.physiqueRating;
  const willRating = props.willRating;

  // If it's a preview in the middle of a save:
  // get the names of all the skills & names/descriptions stunts

  return (
    <>
      <Divider horizontal>
        <h4>ID</h4>
      </Divider>
      <p><strong>Name:</strong> {character.name}</p>
      <Segment basic placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <CharacterAspects aspects={aspects}/>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <CharacterSkills skills={skills}/>
          </Grid.Column>
        </Grid>
      </Segment>
      <CharacterStunts stunts={stunts}/>
      <StressConsequences
        physiqueRating={physiqueRating}
        willRating={willRating}
      />
    </>
  )
}

export default SheetPreview;