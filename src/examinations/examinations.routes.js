const Router = require('express').Router();
const { Examination } = require('./examinations.services');
const { validateDTO, sortArray } = require('../common/helper');
const { validate } = require('../common/middleware');

const examination = new Examination();

Router.get('/:petID/examinations/:eID', (req, res) => {
  try {
    const item = examination.getSingleExamination(req.params.petID, req.params.eID);

    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
});

Router.get('/:petID/examinations', (req, res) => {
  try {
    const item = examination.getAllExaminationsByPet(req.params.petID);
    if('sort' in req.query) {
      sortArray(req.query.sort, item);
    }

    return res.status(200).json(item);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
});

Router.delete('/:petID/examinations/:eID', (req, res) => {
  try {
    const item = examination.deleteSingleExamination(req.params.petID, req.params.eID);

    return res.status(200).json(item);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

Router.post('/:petID/examinations', validate(['id?', 'scheduled', 'notes']), (req, res) => {
  // this code is not needed because middleware function is used here for validating
  /* const properties = ['id?', 'scheduled', 'notes'];

  if (!validateDTO(req.body, properties)) {
    return res.status(400).json({
      error: 'DTO is not valid',
    });
  } */

  try {
    const newExamination = examination.createSingleExamination(req.params.petID, req.body);
    return res.status(200).json(newExamination);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

Router.put('/:petID/examinations/:eID', (req, res) => {
  const properties = ['report'];

  if (!validateDTO(req.body, properties)) {
    return res.status(400).json({
      error: 'DTO is not valid',
    });
  }

  try {
    const report = examination.updateReport(req.params.petID, req.params.eID, req.body);

    return res.status(200).json(report);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
});

module.exports = {
  Router,
};
