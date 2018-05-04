const { pets } = require('../pets/pets.mock');
const { PetService } = require('../pets/pets.services');
const { helper } = require('../common/helper');

const petService = new PetService();

class Examination {

    getSingleExamination(petID, eId) {
        const pet =  petService.getSingle(petID);
        return pet.examinations.find(examination => examination.id === parseInt(eId));
    }
    getAllExaminationsByPet(id) {
        return petService.getSingle(id).examinations;
    }
    deleteSingleExamination(petID, eID) {
        const pet = petService.getSingle(petID);
        return pet.examinations.splice(pet.examinations.findIndex(value => value.id === parseInt(eID)), 1);
    }
    createSingleExamination(petID, newExamination) {
        let pet = petService.getSingle(petID);
        const createExamination = Object.assign({}, newExamination, {
            id : newExamination.id || helper.generateID(),
            scheduled: newExamination.scheduled,
            notes: newExamination.notes
        });
        pet.examinations = Object.assign({}, createExamination);
    }
    updateReport(petID, eID, newReport) {

        let examination = this.getSingleExamination(petID, eID);

        examination = Object.assign({}, examination, {
            report: newReport.report,
            finished: Date.now()
        });

        let pet = petService.getSingle(petID);
        this.deleteSingleExamination(petID, eID);

        return newReport;
    }
}
module.exports = {
    Examination
};