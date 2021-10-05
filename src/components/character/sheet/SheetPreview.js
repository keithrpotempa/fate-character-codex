import React from "react";
import { Divider, Grid, Label, Segment } from "semantic-ui-react"

import StressConsequences from "./StressConsequences";
import CharacterAspects from "./CharacterAspects";
import CharacterSkills from "./CharacterSkills";
import CharacterStunts from "./CharacterStunts";
import { useFateRules } from "../../../hooks/useFateRules";

const SheetPreview = ({
  character,
  characterSubType,
  aspects,
  skills,
  stunts,
  physiqueRating,
  willRating,
}) => {
  // This component renders a Character Sheet for:
  // the character sheet (character detail view)
  // Review; last stage of creating / editing a character

  const { characterSubTypes, characterTypes } = useFateRules();

  const characterSubTypeObject = characterSubTypes.find((st) => st.id === parseInt(characterSubType));
  const characterTypeObject = characterTypes.find((t) => t.id === characterSubTypeObject?.characterTypeId);

  return (
    <>
      <Divider horizontal>
        <h4>ID</h4>
      </Divider>
      {/* <div className="flex-space-between"> */}
        <p><strong>Name:</strong> {character.name}</p>
        <Label
          tag
          color="blue"
          content={characterSubTypeObject?.name}
        />
      {/* </div> */}
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
        characterType={characterTypeObject}
        characterSubType={characterSubTypeObject}
      />
    </>
  )
}

export default SheetPreview;