const Router = require("express").Router();
const { Examination } = require("./examinations.services");
const { validateDTO } = require("../common/helper");

const examination = new Examination();

Router.get("/:petID/examinations/:eID", function(req, res) {

  const item = examination.getSingleExamination(req.params.petID, req.params.eID);
  res.status(200).json(item);
});

Router.get("/:petID/examinations", function(req, res) {

  const item = examination.getAllExaminationsByPet(req.params.petID);
  res.status(200).json(item);
});

Router.delete("/:petID/examinations/:eID", function(req, res) {
  try {

    const item = examination.deleteSingleExamination(req.params.petID, req.params.eID);
    return res.status(200).json(item);

  } catch (err) {

    return res.status(400).json({
      error: err.message
    });
  }

});

Router.post("/:petID/examinations", function(req, res) {

  const properties = ["id?", "scheduled", "notes"];

  if (!validateDTO(req.body, properties)) {
    return res.status(400).json({
      error: "DTO is not valid"
    });
  }

  try {

    const newExamination = examination.createSingleExamination(req.params.petID, req.body);
    return res.status(200).json(newExamination);

  } catch (err) {

    return res.status(400).json({
      message: err.message
    });
  }

});

Router.put("/:petID/examinations/:eID", function(req, res) {

  const properties = ["report"];

  if (!validateDTO(req.body, properties)) {
    return res.status(400).json({
      error: "DTO is not valid"
    });
  }
  const report = examination.updateReport(req.params.petID, req.params.eID, req.body);
  res.status(200).json(report);
});

module.exports = {
  Router
};
