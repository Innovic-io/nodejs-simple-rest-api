const { pets } = require("./pets.mock");
const { generateID, validateDTO } = require("../common/helper");

class PetService {

  getSingle(pet) {

    return pets.find(value => value.id === parseInt(pet));
  }

  deleteSingle(petId) {

    const petIndex = pets.findIndex(value => value.id === parseInt(petId));

    if (petIndex === -1) {
      throw new Error("Pet does not exist.");
    }

    return pets.splice(petIndex, 1);
  }

  create(pet) {

    const draftPet = Object.assign({}, pet, {
      id: pet.id || generateID()
    });

    const item = this.getSingle(pet.id);

    if (item) {
      throw new Error("Pet already exists.");
    }

    pets.push(draftPet);

    return draftPet;
  }

  /**
   * Updates existing pet in the list. Only "name", "status", and "owner" can be updated.
   * @param pet is the request body
   */
  updatePet(id, pet) {

    let newPet = this.getSingle(id);

    if (!newPet) {
      throw new Error("Pet does not exist.");
    }

    newPet = Object.assign({}, newPet, {
      name: pet.name || newPet.name,
      status: pet.status || newPet.status,
      owner: pet.owner || newPet.owner
    });

    this.deleteSingle(id);
    this.create(newPet);
    return newPet;
  }
}

module.exports = {
  PetService
};
