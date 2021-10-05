import React, { createContext, useMemo } from "react";
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
// gets some initial data necessary to render a character sheet, 
// and passes it on to the munger to organize and format

// It is used by the character sheet view (detail route)
// but not in the review stage of the character creation process

// TODO: possibly can be merged back with munger 
// now that skill list and stunt list have been lifted 


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

  const characterSheetContextValue = useMemo(() => ({
    character,
    characterSubType,
    characterAspects,
    characterSkills,
    characterStunts,
    physiqueRating,
    willRating,
    isLoading,
    deleteCharacter,
  }), [
    character,
    characterSubType,
    characterAspects,
    characterSkills,
    characterStunts,
    physiqueRating,
    willRating,
    isLoading,
    deleteCharacter,
  ])

  return (
    <CharacterSheetContext.Provider value={characterSheetContextValue} >
      <Container text>
        {isLoading 
          ? <Loader active inline='centered' />
          : 
            <SheetPreview 
              character={character}
              aspects={characterAspects}
              skills={characterSkills}
              stunts={characterStunts}
              physiqueRating={physiqueRating}
              willRating={willRating}
              characterSubType={characterSubType}
            />
        }
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
    </CharacterSheetContext.Provider>
  )
}

export const CharacterSheetContext = createContext();

export default CharacterSheet;