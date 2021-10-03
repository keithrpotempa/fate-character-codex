import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { Card, Container } from "semantic-ui-react"
import { useFateRules } from "../../hooks/useFateRules";
import SkillCard from "./SkillCard"

const SkillList = props => {
  const { skillList } = useFateRules();

  // State related to pagination 
  // reference: https://www.npmjs.com/package/react-hooks-paginator
  const pageLimit = 9;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(skillList.slice(offset, offset + pageLimit))
  }, [offset, skillList])

  return (
    <>
      <Container>
        <div className="header-container">
          <h1>Skills</h1>
        </div>
        <Card.Group stackable itemsPerRow={3}>
          {currentData.map((skill, index) => 
            <SkillCard
              key={`skill-${skill.id}`}
              skill={skill}
            />  
          )}
        </Card.Group>
        <Paginator 
          totalRecords={skillList.length}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </>
  )
}

export default SkillList