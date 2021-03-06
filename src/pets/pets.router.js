const { pets } = require('./pets.mock');
const { validateDTO, sortArray } = require('../common/helper');
const Router = require('express').Router();
const { PetService } = require('./pets.services');
const { Examination } = require('../examinations/examinations.services');

const petService = new PetService();
const examination = new Examination();

function splitQueryIntoSortAndFilter(requestQuery) {
  let sortKey;

  if (Object.keys(requestQuery).length) {
    if ('sort' in requestQuery) {
      sortKey = requestQuery.sort;
      delete requestQuery.sort;
    }
  }

  return [sortKey, requestQuery];
}

function filterArray(filterQuery, array) {
  if (Object.keys(filterQuery).length) {
    for (const key of Object.keys(filterQuery)) {
      array = array.filter(pet => pet[key] === filterQuery[key]);
    }
  }

  return array;
}

Router.get('/', (req, res) => {

  const [sortKey, filterQuery] = splitQueryIntoSortAndFilter(req.query);
  const petFilter = filterArray(filterQuery, [...pets]);

  sortArray(sortKey, petFilter);

  return res.json(petFilter);
});

Router.get('/:id', (req, res) => {
  try {
      const examinations = examination.getAllExaminationsByPet(req.params.id);
    if('sort' in req.query) {
      sortArray(req.query.sort, examinations);
    }
    const item = petService.getSingle(req.params.id);
    item.examinations = examinations;

    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
});

Router.delete('/:id', (req, res) => {
  try {
    const item = petService.deleteSingle(req.params.id);

    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
});

Router.post('/', (req, res) => {
  const properties = ['id?', 'category?', 'name', 'photoUrls?', 'tags?', 'status', 'examinations?'];

  if (!validateDTO(req.body, properties)) {
    return res.status(400).json({
      error: 'DTO is not valid',
    });
  }
  try {
    const pet = petService.create(req.body);

    return res.status(201).json(pet);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
});

Router.put('/:id', (req, res) => {
  const properties = ['name?', 'status?', 'owner?'];

  if (!validateDTO(req.body, properties)) {
    return res.status(400).json({
      error: 'DTO is not valid',
    });
  }

  try {
    const item = petService.updatePet(req.params.id, req.body);

    return res.status(200).json(item);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = {
  Router,
};
