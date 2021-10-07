import React, { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { Card } from "semantic-ui-react";
import { useFateRules } from "../../../hooks/useFateRules";
import SubTypeCard from "./SubTypeCard";

/* 
  Child component of Types
  this receives a list of subtypes
  (filtered or not) and renders them with pagination
*/
const TypeList = ({ filteredSubTypes }) => {
  const { characterTypes } = useFateRules();

  // State related to pagination 
  // reference: https://www.npmjs.com/package/react-hooks-paginator
  const pageLimit = 9;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(filteredSubTypes.slice(offset, offset + pageLimit))
  }, [offset, filteredSubTypes])

  return (
    <>
      <Card.Group itemsPerRow={3}>
        {currentData.map(subType => 
            <SubTypeCard
              key={`subType-${subType.id}`}
              subType={subType}
              type={characterTypes.find(type => type.id === subType.characterTypeId)}
            />  
          )
        }
      </Card.Group>
      <Paginator 
          totalRecords={filteredSubTypes.length}
          pageLimit={pageLimit}
          pageNeighbours={2}
          setOffset={setOffset}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
    </>
  )
}

export default TypeList