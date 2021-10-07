import { useState } from 'react';
import { 
  skillsAreEmpty, 
  validationConfirm, 
  duplicateSkills, 
  duplicateStunts 
} from '../helpers/characterValidators';

const useSteppedForm = (character, characterAspects, characterSkills, characterStunts) => {
  const [step, setStep] = useState(1);

  const handleStepItemClick = (evt, {index}) => {
    if (validStep()) {
      setStep(index);
    }
  }

  const handleNextButtonClick = () => {
    // User cannot move forward unless the current fields
    // are valid. But they can move backwards.
    if (validStep()) {
      setStep(step+1)
    }
  }
  const handlePreviousButtonClick = () => {
    setStep(step-1)
  }

  const validStep = () => {
    switch(step) {
      default:
      case 1:
        if (character.name === "") {
          validationConfirm("Enter a character name")
          return false
        } else if (character.subtype === "") {
          validationConfirm("Enter a character type & subtype")
          return false
        } else {
          return true
        }
      case 2: 
        if (characterAspects[0].name === "") {
          validationConfirm("Enter a High Concept aspect")
          return false
        } else {
          return true
        }
      case 3: 
        if (skillsAreEmpty(characterSkills)) {
          validationConfirm("Choose at least one skill")
          return false
        } else if (duplicateSkills(characterSkills).length > 0) {
          validationConfirm("You cannot have any duplicate skills")
          return false
        } else {
          return true
        }
      case 4: 
        if (duplicateStunts(characterStunts).length > 0) {
          validationConfirm("You cannot have any duplicate stunts")
          return false
        } else {
          return true
        }
    }
  }

  return {
    step,
    handleStepItemClick,
    handleNextButtonClick,
    handlePreviousButtonClick,
  }
}

export default useSteppedForm;