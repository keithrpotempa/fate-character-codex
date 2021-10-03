import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon } from "semantic-ui-react";

const SubTypeCard = ({ subType, type }) => {

  return (
    <>
      <Card
        raised
        header={subType.name}
        description={subType.purpose}
        meta={`Associated Type: ${type?.name}`}
        // The following safely open a new tab
        extra={
          <div className="flex-end">
            <Link to={`/types/${subType.id}`}>
              <Button 
                className="ui button"
              >
                <Icon fitted className="file outline"/>
              </Button>
            </Link>  
          </div>
        }
      />
    </>
  )
}

export default SubTypeCard;