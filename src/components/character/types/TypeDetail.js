import React, { useState, useEffect } from "react";
import { Card, Container, Icon } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";

const TypeDetail = props => {
  const [subType, setSubType] = useState({});
  const id = props.subTypeId;
  const verbose = props.verbose;

  const getSubType = () => {
    ApiManager.getSubTypeDetails(id)
      .then(setSubType)
  }

  useEffect(()=>{
    getSubType();
  }, [id])

  return (
    <>
      {/* TODO: URL Link  */}
      <Container text>
        <div className="header-container">
          {/* Having issues with this erroring out before full render */}
          {subType.characterType 
            ? <h2> {subType.name}: {subType.characterType.name}</h2>
            : <></>   
          }
        </div>
        <Card.Group itemsPerRow={1}>
          <Card
            header="Competence"
            description={<p>{subType.competence}</p>}
          />
          <Card
            header="Purpose"
            description={<p>{subType.purpose}</p>}
          />
          {verbose === true 
            ? <>
                <Card
                  header="Aspects"
                  description={
                    <>
                      <p>
                        {`Max Aspects: ${subType.maxAspects}`}
                      </p>
                      <p>
                        {subType.aspectComment}
                      </p>
                    </>
                  }
                />
                <Card
                  header="Skills"
                  description={
                    <>
                      <p>
                        {`Max Skill Rating: ${subType.maxSkillRating}`}
                      </p>
                      <p>
                        {subType.skillRatingComment}
                      </p>
                      <p>
                        {subType.skillChoiceComment}
                      </p>
                    </>
                  }
                />
                <Card
                  header="Stunts"
                  description={
                    <>
                      <p>
                        {`Max Stunts: ${subType.maxStunts}`}
                      </p>
                      <p>
                        {subType.stuntComment}
                      </p>
                    </>
                  }
                />
                <Card
                  header="Stress"
                  description={
                    <>
                      <p>
                        {`Maximum Level of Stress Boxes: ${subType.stressMax}`}
                      </p>
                      <p>
                        Stress Types: 
                        {subType.bothStressTypes
                          ? `Physical and Mental`
                          : `One generic stress type`
                        }
                      </p>
                    </>
                  }
                />
              </>
            : <></>
          }
          <div className="flex-end">
            <a target="_blank" rel="noopener noreferrer" href={subType.url}>
              <Icon fitted link className="linkify"/>
            </a>
          </div>
        </Card.Group>     
      </Container>
    </>
  )
}

export default TypeDetail;