import React, { useState, useEffect } from "react";
import { Card, Container } from "semantic-ui-react";
import ApiManager from "../../../modules/ApiManager";
import SubTypeCard from "./SubTypeCard";

const TypeList = props => {
  const [typeList, setTypeList] = useState([]);
  const [subTypeList, setSubTypeList] = useState([]);

  const getTypeList = () => {
    return ApiManager.getAll("characterTypes")
      .then(setTypeList);
  }

  const getSubTypeList = () => {
    return ApiManager.getAll("characterSubTypes")
      .then(setSubTypeList);
  }

  useEffect(() => {
    getTypeList();
    getSubTypeList();
  }, [])

  return (
    <>
      <Container>
        <div className="header-container">
          <h1>Character Types</h1>
        </div>
        <Card.Group itemsPerRow={3}>
          {subTypeList.sort((a,b) => a.name.localeCompare(b.name))
            .map(subType => 
              <SubTypeCard
                key={subType.id}
                subType={subType}
              />  
            )
          
          }
        </Card.Group>
      </Container>
    </>
  )


}

export default TypeList