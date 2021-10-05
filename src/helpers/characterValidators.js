import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const validChar = (character, aspects, skills) => {
  const skillsAreEmpty = (characterSkills) => {
    const skillLevels = Object.values(characterSkills)
    const nonEmptySkillLevels = skillLevels.filter(skillLevel => skillLevel.length !== 0)
    if (nonEmptySkillLevels.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  if (character.name === "") {
    validationConfirm("Enter a character name")
  } else if (aspects[0].name === "") {
    validationConfirm("Enter a High Concept aspect")
  } else if (skillsAreEmpty(skills)) {
    validationConfirm("Choose at least one skill")
  } else if (duplicateSkills().length > 0) {
    validationConfirm("You cannot have any duplicate skills")
  } else if (duplicateStunts().length > 0) {
    validationConfirm("You cannot have any duplicate stunts")
  } else {
    return true
  }
}

const validationConfirm = (message) => {
  confirmAlert({
    title: 'Required Field',
    message: message,
    buttons: [
      {
        label: 'Ok',
        onClick: null
      }
    ]
  });
}

const duplicateSkills = (skills) => {
  const skillLevels = Object.values(skills)
  const nonEmptySkillLevels = skillLevels.filter(skillLevel => skillLevel.length !== 0)
  // Flatteing using the ES6 spread operator:
  // https://www.jstips.co/en/javascript/flattening-multidimensional-arrays-in-javascript/
  const allSkills = [].concat(...nonEmptySkillLevels);
  // Finding duplicates in an array:
  // https://stackoverflow.com/a/840808
  const sortedSkills = allSkills.slice().sort();
  let duplicates = [];
  for (let i = 0; i < sortedSkills.length - 1; i++) {
    if (sortedSkills[i+1] === sortedSkills[i]) {
      duplicates.push(sortedSkills[i]);
    }
  }
  return duplicates;
}

const duplicateStunts = (stunts) => {
  const stuntRows = Object.values(stunts)
  const nonEmptyStuntRows = stuntRows.filter(stuntRow => stuntRow.length !== 0)
  // Flatteing using the ES6 spread operator:
  // https://www.jstips.co/en/javascript/flattening-multidimensional-arrays-in-javascript/
  const allStunts = [].concat(...nonEmptyStuntRows);
  // Finding duplicates in an array:
  // https://stackoverflow.com/a/840808
  const sortedStunts = allStunts.slice().sort();
  let duplicates = [];
  for (let i = 0; i < sortedStunts.length - 1; i++) {
    if (sortedStunts[i+1] === sortedStunts[i]) {
      duplicates.push(sortedStunts[i]);
    }
  }
  return duplicates;
}