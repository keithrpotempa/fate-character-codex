const remoteURL = "http://localhost:5002";

export default {
  get(dataType, id) {
    return fetch(`${remoteURL}/${dataType}/${id}`)
      .then(result => result.json());
  },
  getCharacterWithType(id) {
    return fetch(`${remoteURL}/characters/${id}?_expand=characterSubType`)
      .then(result => result.json());
  },
  getAll(dataType) {
    return fetch(`${remoteURL}/${dataType}`)
      .then(result => result.json());
  },
  getUserByEmail(email) {
    return fetch(`${remoteURL}/users?email=${email}`)
    .then(result => result.json());
  },
  getCharacterAspects(id){
    return fetch(`${remoteURL}/characterAspects?characterId=${id}`)
      .then(results => results.json());
  },
  getCharacterSkills(id){
    return fetch(`${remoteURL}/characterSkills?characterId=${id}&_expand=skill`)
      .then(results => results.json());
  },
  getCharacterStunts(id) {
    return fetch(`${remoteURL}/characterStunts?characterId=${id}&_expand=stunt`)
      .then(results => results.json())
  },
  getCharacterList() {
    return fetch(`${remoteURL}/characters?_embed=characterAspects&_expand=user&_expand=characterSubType`)
      .then(results => results.json())
  },
  getAllSubTypesWithDetails() {
    return fetch(`${remoteURL}/characterSubTypes/?_expand=characterType`)
      .then(results => results.json())
  },
  getSubTypeDetails(id) {
    return fetch(`${remoteURL}/characterSubTypes/${id}?_expand=characterType`)
      .then(results => results.json())
  },
  getAllExpand(dataType, expandType) {
    return fetch(`${remoteURL}/${dataType}?_expand=${expandType}`)
      .then(results => results.json())
  },
  getAllEmbed(dataType, embedType) {
    return fetch(`${remoteURL}/${dataType}?_embed=${embedType}`)
      .then(results => results.json())
  },
  search(dataType, query){
    return fetch(`${remoteURL}/${dataType}?q=${query}`)
      .then(results => results.json())
  },
  delete(dataType, id) {
    return fetch(`${remoteURL}/${dataType}/${id}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  deleteByCharacterId(dataType, charId) {
    return fetch(`${remoteURL}/${dataType}?characterId=${charId}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  post(dataType, objectToPost) {
    return fetch(`${remoteURL}/${dataType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToPost)
    }).then(data => data.json());
  },
  update(dataType, objectToEdit) {
    return fetch(`${remoteURL}/${dataType}/${objectToEdit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToEdit)
    }).then(data => data.json());
  }
};
