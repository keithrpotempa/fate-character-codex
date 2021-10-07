import React, { useState, useEffect } from "react";
import { Container, Divider } from "semantic-ui-react";
import "../character/Character.css";
import AspectForm from "../character/form/AspectsForm";
import SkillsForm from "../character/form/SkillsForm";
import StuntsForm from "../character/form/StuntsForm";
import SheetPreview from "../character/sheet/SheetPreview";
import CharacterId from "../character/form/CharacterId";
import { useFateRules } from "../../hooks/useFateRules";
import { useCharacterSkills } from "../../hooks/characterSheet/useCharacterSkills";
import { useCharacterStunts } from "../../hooks/characterSheet/useCharacterStunts";
import { useCharacterAspects } from "../../hooks/characterSheet/useCharacterAspects";
import { useCharacterBasics } from "../../hooks/characterSheet/useCharacterBasics";
import { useAuth } from "../../hooks/useAuth";
// import { validChar } from "../../helpers/characterValidators";
import ApiManager from "../../modules/ApiManager";
import useSteppedForm from "../../hooks/useSteppedForm";
import SteppedFormControls from "./SteppedFormControls";

const MainForm = ({
  characterId,
  history
}) => {

  const { user } = useAuth();

  const {
    skillList,
    stuntList,
    // characterTypes,
    characterSubTypes,
  } = useFateRules();

  const { 
    // isLoading,
    // setIsLoading,
    character,
    setCharacterName,
    characterType,
    setCharacterType,
    characterSubType,
    setCharacterSubType,
    saveCharacterBasics,
  } = useCharacterBasics(characterId, characterSubTypes, user);

  const { 
    // isLoading,
    // setIsLoading,
    characterAspects,
    setCharacterAspects,
    resetAspects,
    saveCharacterAspects,
  } = useCharacterAspects(characterId);

  const { 
    // isLoading,
    // setIsLoading,
    characterStunts,
    setCharacterStunts,
    resetStunts,
    saveCharacterStunts,
  } = useCharacterStunts(characterId, stuntList);
  
  const { 
    // isLoading,
    // setIsLoading,
    characterSkills,
    setCharacterSkills,
    physiqueRating,
    willRating,
    resetSkills,
    saveCharacterSkills,
  } = useCharacterSkills(characterId, skillList);

  const {
    step,
    handleStepItemClick,
    handleNextButtonClick,
    handlePreviousButtonClick,
  } = useSteppedForm(character, characterAspects, characterSkills, characterStunts);

  // const { 
  //   isLoading,
  //   deleteCharacter,
  // } = useCharacterSheet(characterId, stuntList, skillList);

  const resetCharacter = () => {
    resetAspects();
    resetSkills();
    resetStunts();
  }

  const saveAll = (char) => {
    return Promise.all([
      saveCharacterBasics(char),
      saveCharacterAspects(char.id),
      saveCharacterSkills(char.id),
      saveCharacterStunts(char.id),
    ])
  }

  async function handleSaveAll (e) {
    e.preventDefault();
    // FIXME: VALIDATION BUSTED
    // SAVING CHARACTER
    // if (validChar(character, characterAspects, characterSkills)) {
      setIsLoading(true);
      saveCharacterBasics();
      if (characterId) {
        // IF editing, delete everything before starting
        // TODO: figure out a better way?
        await ApiManager.purgeCharacter(characterId);
      }
      saveAll(character).then(() => {
        history.push("/characters")
      });
    // }
  }

  const characterSubTypeObject = characterSubTypes.find((st) => st.id === parseInt(characterSubType));

  const [isLoading, setIsLoading] = useState(false);

  const characterInProgress = () => {
    if (characterAspects[0].name !== "" 
        || characterSkills[1].length > 0
        || characterStunts[1] !== ""
    ) {
    return true
    } else {
      return false
    }
  }

  /* ------------------ RENDERING  ------------------*/
  // Helpful links:
  // https://www.digitalocean.com/community/tutorials/how-to-create-multistep-forms-with-react-and-semantic-ui
  const renderStepPage = () => {
    switch(step){
      default: 
      case 1:
        return <CharacterId 
          character={character} 
          setCharacterName={setCharacterName}
          characterType={characterType}
          setCharacterType={setCharacterType}
          characterSubType={characterSubType}
          setCharacterSubType={setCharacterSubType}
          characterInProgress={characterInProgress}
          resetCharacter={resetCharacter}
        />
      case 2: 
        return <AspectForm
          subType={characterSubTypeObject}
          aspects={characterAspects}
          setAspects={setCharacterAspects}
        />
      case 3: 
        return <SkillsForm 
          characterSkills={characterSkills}
          setCharacterSkills={setCharacterSkills}
          characterSubType={characterSubTypeObject}
        />
      case 4: 
        return <StuntsForm
          characterStunts={characterStunts}
          setCharacterStunts={setCharacterStunts}
          characterSubType={characterSubTypeObject}
        />
      case 5:
        return <>
            <Divider horizontal><h1>Review and Save</h1></Divider>
            <SheetPreview
              character={character}
              characterSubType={characterSubType}
              aspects={characterAspects}
              skills={characterSkills}
              stunts={characterStunts}
              physiqueRating={physiqueRating}
              willRating={willRating}
            />
        </>
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, [])

  return (
    <Container>
      <SteppedFormControls
        isLoading={isLoading}
        step={step}
        handleStepItemClick={handleStepItemClick}
        handleNextButtonClick={handleNextButtonClick}
        handlePreviousButtonClick={handlePreviousButtonClick}
        handleSaveAll={handleSaveAll}
      >
        {renderStepPage()}
      </SteppedFormControls>
    </Container>
  )
}

export default MainForm;