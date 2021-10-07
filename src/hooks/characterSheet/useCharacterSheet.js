import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import ApiManager from "../../modules/ApiManager";

export const useCharacterSheet = (id, stuntList, skillList) => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Code repeated elsewhere
  const deleteCharacter = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete this character?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => ApiManager.delete("characters", id)
            // FIXME: no props
            // .then(history.push("/characters"))
        },
        {
          label: 'No',
          onClick: null
        }
      ]
    });
  }

  const resetCharacter = () => {
    // FIXME: doesn't have access to these others
    // setCharacterAspects(EMPTY_ASPECTS);  
  }
  


  return {
    isLoading,
    setIsLoading,
    deleteCharacter,
    resetCharacter,
  }
}

