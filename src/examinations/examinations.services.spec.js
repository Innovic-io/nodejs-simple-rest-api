const assert = require('assert');
const { Examination } = require('./examinations.services');
const { PetService } = require('../pets/pets.services');

const examinations = new Examination();
const petService = new PetService();

const expectedPet = {
  id: 1622147641,
  category: {
    id: 0,
    name: 'string',
  },
  name: 'doggie',
  photoUrls: [
    'string',
  ],
  tags: [
    {
      id: 0,
      name: 'string',
    },
  ],
  status: 'available',
  examinations: [
    {
      id: 1314544864,
      scheduled: 'date',
      notes: 'text',
      report: 'text',
      finished: 'time',
    },
    {
      id: 1551547864,
      scheduled: 'date',
      notes: 'text',
    },
  ],
  owner: 'schrimsher',
};

/**
 * checks if getSingleExamination() returns expected examination for provided petID and examinationID
 */
assert.deepEqual(examinations.getSingleExamination(1622147641, 1314544864), expectedPet.examinations[0]);

/**
 * checks if getAllExaminationsByPet() returns all examinations of a pet
 */
assert.deepEqual(examinations.getAllExaminationsByPet(1622147641), expectedPet.examinations);

const expected = expectedPet.examinations.splice(0, 1);
const actual = examinations.deleteSingleExamination(1622147641, 1314544864);

/**
 * checks if deleteSingleExamination() deletes the right examination
 */
assert.deepStrictEqual(actual, expected);

const newExamination = {
  scheduled: '12.12.2020.',
  notes: 'checked pet',
};
const createExamination = examinations.createSingleExamination(1622147641, newExamination);

/**
 * these check if createSingleExamination() creates new examination
 */
assert.equal(createExamination.scheduled, newExamination.scheduled);
assert.equal(createExamination.notes, newExamination.notes);

newExamination.id = 123;

assert.deepStrictEqual(newExamination, examinations.createSingleExamination(1622147641, newExamination));

expectedPet.examinations[0].report = 'unfazed';
assert.equal(examinations.updateReport(1622147641, 1551547864, { report: 'unfazed' }).report, expectedPet.examinations[0].report);
