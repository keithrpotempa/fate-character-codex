import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useCharacterSheet } from "../../../hooks/characterSheet/useCharacterSheet";
import { useFateRules } from "../../../hooks/useFateRules";

import { Link } from "react-router-dom";
import { Container, Button, Icon, Loader} from "semantic-ui-react"

import CharacterMeta from "./CharacterMeta";
import SheetPreview from "./SheetPreview";
import { useCharacterBasics } from "../../../hooks/characterSheet/useCharacterBasics";
import { useCharacterAspects } from "../../../hooks/characterSheet/useCharacterAspects";
import { useCharacterStunts } from "../../../hooks/characterSheet/useCharacterStunts";
import { useCharacterSkills } from "../../../hooks/characterSheet/useCharacterSkills";

// This parent component (of all character sheet components) 
// is used by the character sheet view (detail route)
// but not in the review stage of the character creation / editing process

const CharacterSheet = ({ characterId }) => {
  
  const { user: activeUser } = useAuth();

  const { isLoading: rulesLoading, stuntList, skillList, characterSubTypes } = useFateRules();

  const { isLoading: basicsLoading, character, characterSubType } = useCharacterBasics(characterId, characterSubTypes);
  const { isLoading: aspectsLoading, characterAspects } = useCharacterAspects(characterId);
  const { isLoading: stuntsLoading, characterStunts } = useCharacterStunts(characterId, stuntList);
  const { 
    isLoading: skillsLoading,
    characterSkills,
    physiqueRating,
    willRating,
  } = useCharacterSkills(characterId, skillList);

  const { 
    isLoading: characterLoading,
    deleteCharacter,
  } = useCharacterSheet(characterId, stuntList, skillList);

  const isLoading = characterLoading 
    || skillsLoading 
    || stuntsLoading
    || aspectsLoading
    || basicsLoading
    || rulesLoading

  if (isLoading) {
    return <Loader active inline='centered' /> 
  }

  return (
    <Container text>
      <SheetPreview 
        character={character}
        aspects={characterAspects}
        skills={characterSkills}
        stunts={characterStunts}
        physiqueRating={physiqueRating}
        willRating={willRating}
        characterSubType={characterSubType}
      />
      {/* Letting creating user delete & edit */}
      {activeUser && character.userId === activeUser.id 
        ? <div className="flex-end">
            <Link to={`/characters/${characterId}/edit`}>
              <Button disabled={isLoading} >
                <Icon fitted className="edit outline"/>
              </Button>
            </Link>
            <Button
              className="ui button"
              type="button"
              onClick={() => deleteCharacter(characterId)}
              disabled={isLoading}
            >
              <Icon fitted className="trash alternate outline"/>
            </Button>
          </div>
        : null
      }
      <CharacterMeta character={character} userId={character.userId}/>
    </Container>
  )
}

export default CharacterSheet;