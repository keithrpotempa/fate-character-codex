import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ApiManager from "../../modules/ApiManager";
import StressConsequences from "./StressConsequences";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [aspects, setAspects] = useState([]);
  const [skillGroups, setSkillGroups] = useState([]);
  const [physiqueRating, setPhysiqueRating] = useState({});
  const [willRating, setWillRating] = useState({});
  const [stunts, setStunts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const activeUser = JSON.parse(sessionStorage.getItem("credentials"));
  const id = props.characterId;

  const getCharacter = () => {
    ApiManager.get("characters", id)
      .then(setCharacter);
  }

  const getAspects = () => {
    ApiManager.getCharacterAspects(id)
      .then(setAspects);
  }

  const getSkills = () => {
    ApiManager.getCharacterSkills(id)
    .then(skills => {
        // Before the skills are sorted into a weird format to output
        // we extract the rating of will and physique to use later
        // If they don't have a rating, consider it to be zero
        const will = skills.find( ({skillId}) => skillId === 18)
        will ? setWillRating(will.skillRating) : setWillRating(0)

        const physique = skills.find( ({skillId}) => skillId === 12)
        physique ? setPhysiqueRating(physique.skillRating) : setPhysiqueRating(0)
        
        return skills
      })
      .then(makeSkillGroups)
      .then(setSkillGroups)
  }

  const getStunts = () => {
    ApiManager.getCharacterStunts(id)
      .then(setStunts);
  }

  const makeSkillGroups = (skills) => {
    // Sort the skills so that the highest rating is at the top
    skills = skills.sort((a,b) =>  b.skillRating - a.skillRating)
    // Seed/start the skillGroups array with the char's highest skill rating
    const skillGroups = [{rating: skills[0].skillRating, skills: []}]
    /* 
      Loop over every skill the character has;
      if there's a matching group, 
      place it in that group's skills array, 
      otherwise, start a new group. 
    */
    skills.forEach(skill => {
      const skillName = skill.skill.name;
      const skillRating = skill.skillRating;
      const matchingGroup = skillGroups.find( ({rating}) => rating === skillRating)
      matchingGroup 
        ? matchingGroup.skills.push(skillName) 
        : skillGroups.push({rating: skillRating, skills: [skillName]})
    })
    return skillGroups;
  }

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
            .then(props.history.push("/characters"))
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  useEffect(()=>{
    getCharacter();
    getAspects();
    getSkills();
    getStunts();
    setIsLoading(false);
  }, [])

  return (
    <>
      <main>
        <div className="card">
          <div className="card-content">
            <p><strong>Name:</strong> {character.name}</p>
            <div>
              {/* TOFIX: className="flex-row" */}
              <p><strong>Aspects</strong></p>
              <ul>
                {aspects.map(aspect =>
                  <li key={"aspect-" + aspect.id}>
                    {aspect.name}
                  </li>
                )}
              </ul>
              <p><strong>Skills</strong></p>
              <ul>
                {skillGroups.map(group => 
                  <li key={"skillRating-" + group.rating}>
                    <strong>+{group.rating}:</strong> {group.skills.join(", ")}
                  </li>  
                )}
              </ul>
            </div>
            <p><strong>Stunts</strong></p>
            <ul>
              {stunts.map(stunt => 
                <li key={"stunt-" + stunt.stunt.id }>
                  <strong>{stunt.stunt.name}:</strong> {stunt.stunt.description}
                </li>
              )}
            </ul>
            <StressConsequences
              physiqueRating={physiqueRating}
              willRating={willRating}
            />
            {/* Conditionally rendering these buttons 
              if the user created this character */}
            {character.userId === activeUser.id 
              ? <Link to={`/characters/${id}/edit`}>
                  <button>Edit</button>
                </Link>
              : null
            }
            {character.userId === activeUser.id 
              ? <button
                  type="button"
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </button>
              : null
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default CharacterSheet