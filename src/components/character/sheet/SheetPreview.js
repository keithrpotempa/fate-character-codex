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

  const { isLoading, characterSubTypes, characterTypes, stuntList } = useFateRules();

  let characterSubTypeObject;
  let characterTypeObject;

  // Don't render unless we have everything we need
  if (
    !isLoading 
    && characterSubTypes.length > 0 
    && characterTypes.length > 0 
    && character.characterSubTypeId 
    && characterSubType
  ) {
    characterSubTypeObject = characterSubTypes.find((st) => st.id === parseInt(characterSubType));
    characterTypeObject = characterTypes.find((t) => t.id === characterSubTypeObject?.characterTypeId);

    
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
        <CharacterStunts stunts={stunts} stuntList={stuntList}/>
        <StressConsequences
          physiqueRating={physiqueRating}
          willRating={willRating}
          characterType={characterTypeObject}
          characterSubType={characterSubTypeObject}
        />
      </>
    )
  }

  return null;
}

export default SheetPreview;