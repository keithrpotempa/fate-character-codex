import React, { createContext, useMemo } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useCharacterSheet } from "../../../hooks/useCharacterSheet";
import { useFateRules } from "../../../hooks/useFateRules";

import { Link } from "react-router-dom";
import { Container, Button, Icon} from "semantic-ui-react"

import CharacterMeta from "./CharacterMeta";
import SheetPreview from "./SheetPreview";

// This parent component (of all character sheet components) 
// gets some initial data necessary to render a character sheet, 
// and passes it on to the munger to organize and format

// It is used by the character sheet view (detail route)
// but not in the review stage of the character creation process

// TODO: possibly can be merged back with munger 
// now that skill list and stunt list have been lifted 


const CharacterSheet = ({ characterId }) => {
  
  const { user: activeUser } = useAuth();

  const { stuntList, skillList } = useFateRules();

  const { 
    character,
    characterSubType,
    characterAspects,
    characterSkills,
    characterStunts,
    physiqueRating,
    willRating,
    isLoading,
    deleteCharacter,
  } = useCharacterSheet(characterId, stuntList, skillList);

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
        <SheetPreview 
          character={character}
          aspects={characterAspects}
          skills={characterSkills}
          stunts={characterStunts}
          physiqueRating={physiqueRating}
          willRating={willRating}
          characterSubType={characterSubType}
        />
          {/* Conditionally rendering these buttons 
            if the user created this character */}
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
            : <></>
          }
          <CharacterMeta character={character} userId={character.userId}/>
      </Container>
    </CharacterSheetContext.Provider>
  )
}

export const CharacterSheetContext = createContext();

export default CharacterSheet;