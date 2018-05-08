const { PetService } = require("../pets/pets.services");
const { generateID } = require("../common/helper");

const petService = new PetService();

class Examination {

  /**
   * get/pets/petID/examinations/examinationID
   * @param petID
   * @param eId
   * @returns {*}
   */
  getSingleExamination(petID, eId) {

    const pet = petService.getSingle(petID);
    const examination = pet.examinations.find(value => value.id === parseInt(eId));

    if (!examination) {
      throw new Error('Examination does not exist.')
    }

    return examination;
  }

  /**
   * get/pets/petID/examinations
   * @param id
   * @returns {Array|*[]}
   */
  getAllExaminationsByPet(id) {
    return petService.getSingle(id).examinations;
  }

  /**
   * delete/pets/petID/examinations/examinationID
   * @param petID
   * @param eID
   * @returns {*[]}
   */
  deleteSingleExamination(petID, eID) {

    const pet = petService.getSingle(petID);
    const indexOfExamination = pet.examinations.findIndex(value => value.id === parseInt(eID));

    if (indexOfExamination === -1) {
      throw new Error('Examination does not exist.')
    }

    return pet.examinations.splice(indexOfExamination, 1);
  }

  /**
   *create/pets/petID/examinations/examinationID?
   * @param petID
   * @param newExamination
   * @returns {*}
   */
  createSingleExamination(petID, newExamination) {

    let pet = petService.getSingle(petID);

    if(!pet) {
      throw new Error('Pet does not exist');
    }

    const createExamination = Object.assign({}, newExamination, {
      id: newExamination.id || generateID(),
      scheduled: newExamination.scheduled,
      notes: newExamination.notes
    });

    if (!pet.hasOwnProperty("examinations")) {
      pet.examinations = [];
    }

    pet.examinations.push(createExamination);

    return newExamination;
  }

  /**
   * Updates existing examination. Only report field can be updated.
   * @param petID
   * @param eID
   * @param newReport
   * @returns {*}
   */
  updateReport(petID, eID, newReport) {

    let examination = this.getSingleExamination(petID, eID);

    examination = Object.assign({}, examination, {
      report: newReport.report,
      finished: new Date().toLocaleDateString()
    });

    this.deleteSingleExamination(petID, eID);
    let pet = petService.getSingle(petID);
    pet.examinations.push(examination);

    return newReport;
  }
}

module.exports = {
  Examination
};
