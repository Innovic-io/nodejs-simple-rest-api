const helper = require('../common/helper');
const assert = require('assert');
const { pets } = require('./pets.mock');
const { PetService } = require('./pets.services');

const petService = new PetService();

const id = 1622147644;

/**
 * Checks if getSingle() returns expected object with provided ID
 */
assert.equal(pets.find(value => value.id === id), petService.getSingle(id));

/**
 * Checks if deleteSingleExamination() removes object from pets list
 */
function checkIfDeletes(id) {
    const pet = petService.getSingle(id);
    const lengthBefore = pets.length;
    const [afterDeletion] = petService.deleteSingle(id);
    assert.equal(afterDeletion, pet);
    assert.equal(lengthBefore - 1, pets.length);
}

checkIfDeletes(id);

const pet1 = {
    "category": {
        "id": 0,
        "name": "string"
    },
    "name": "puppet",
    "photoUrls": [
        "string"
    ],
    "tags": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "status": "available"
};
const generatedID = helper.generateID();
const petWithID = Object.assign({}, pet1, {
    id: generatedID
});

assert.deepEqual(petService.create(pet1).category, pet1.category);
assert.deepEqual(petService.create(petWithID).id, generatedID);
assert.deepEqual(petService.create(pet1).tags, pet1.tags);