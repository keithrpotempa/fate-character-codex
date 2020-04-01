import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { Container, Button, Divider, Grid, Icon, Segment } from "semantic-ui-react"
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ApiManager from "../../../modules/ApiManager";
import CharacterMeta from "./CharacterMeta";
import SheetPreview from "./SheetPreview";

const CharacterSheet = props => {
  const [character, setCharacter] = useState({});
  const [characterSubType, setCharacterSubType] = useState({});
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
    ApiManager.getCharacterWithType(id)
      .then(character => {
        setCharacter(character)
        console.log("character.characterSubType", character.characterSubType)
        setCharacterSubType(character.characterSubType)
      });
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
          will ? setWillRating(will.skillRating) : setWillRating(0)

          const physique = rawSkills.find( ({skillId}) => skillId === 12)
          physique ? setPhysiqueRating(physique.skillRating) : setPhysiqueRating(0)
          return rawSkills
      })
      .then(setFormattedSkills)
  }

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

  const getStunts = () => {
    ApiManager.getCharacterStunts(id)
      .then(setStunts);
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
      <Container text>
        <SheetPreview 
          character={character}
          aspects={aspects}
          skills={skills}
          stunts={stunts}
          physiqueRating={physiqueRating}
          willRating={willRating}
          characterSubType={characterSubType}
        />
          {/* Conditionally rendering these buttons 
            if the user created this character */}
          {activeUser && character.userId === activeUser.id 
            ? <div className="flex-end">
                <Link to={`/characters/${id}/edit`}>
                  <Button disabled={isLoading} >
                    <Icon fitted className="edit outline"/>
                  </Button>
                </Link>
                <Button
                  className="ui button"
                  type="button"
                  onClick={() => handleDelete(id)}
                  disabled={isLoading}
                >
                  <Icon fitted className="trash alternate outline"/>
                </Button>
              </div>
            : <></>
          }
          <CharacterMeta character={character} userId={character.userId}/>
      </Container>
    </>
  )
}

export default CharacterSheet