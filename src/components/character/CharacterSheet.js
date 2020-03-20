import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ApiManager from "../../modules/ApiManager";
import StressConsequences from "./StressConsequences";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [aspects, setAspects] = useState([]);
  const [skills, setSkills] = useState({
    6: [],
    5: [],
    4: [],
    3: [],
    2: [],
    1: []
  });
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
      .then(rawSkills => {
          // Before the skills are sorted into a weird format to output
          // we extract the rating of will and physique to use later
          // If they don't have a rating, consider it to be zero
          const will = rawSkills.find( ({skillId}) => skillId === 18)
          // TODO: change to if/else
          will ? setWillRating(will.skillRating) : setWillRating(0)

          const physique = rawSkills.find( ({skillId}) => skillId === 12)
          physique ? setPhysiqueRating(physique.skillRating) : setPhysiqueRating(0)
          return rawSkills
      })
      .then(setFormattedSkills)
  }

  const getStunts = () => {
    ApiManager.getCharacterStunts(id)
      .then(setStunts);
  }

  // FIXME: Skill groups not working; change to dict
  const setFormattedSkills = (rawSkills) => {
    const stateToChange = {...skills};
    // TODO: Make this loop more adaptable to different range of rating levels
    for (let i = 1; i < 7; i++) {
      stateToChange[i] = skillsByRating(rawSkills, i)
    } 
    setSkills(stateToChange)
  }

  const skillsByRating = (rawSkills, rating) => {
    // Converting the format of the db to the format of the form's state
    const filteredSkills = rawSkills.filter(skill => skill.skillRating === rating)
    const formattedSkills = filteredSkills.map(skill => skill.skill.name)
    return formattedSkills;
  }

  const SkillLi = (skillRow, rating) => {
    return (
      <>
        {skillRow.length > 0
          ? <li key={`skillRating-${rating}`}>
              <strong>+{rating}:</strong> {skillRow.join(", ")}
            </li>  
          : <></>
        }
      </>
      )
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
                  <li key={`aspect-${aspect.id}`}>
                    {aspect.name}
                  </li>
                )}
              </ul>
              <p><strong>Skills</strong></p>
              <ul>
                {/* Take the keys of the skills dict (AKA their ratings)
                  and map them [6,5,4], then use that array 
                  to get that rating's array of skills 
                  via square bracket notation
                */}
                {Object.keys(skills)
                  // Sort the skills so that the highest rating is at the top
                  .sort((a,b) =>  b - a)
                  .map(rating => SkillLi(skills[rating], rating))
                }
              </ul>
            </div>
            <p><strong>Stunts</strong></p>
            <ul>
              {stunts.map(stunt => 
                <li key={`stunt-${stunt.stunt.id}`}>
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
                  <button disabled={isLoading} >Edit</button>
                </Link>
              : null
            }
            {character.userId === activeUser.id 
              ? <button
                  type="button"
                  onClick={() => handleDelete(id)}
                  disabled={isLoading}
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