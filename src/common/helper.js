
/* DTO - data transfer object
* Checks if user-input data matches the expected properties.
* */
function validateDTO(reqBody, properties) {
    for (let element of properties) {
        if (!reqBody.hasOwnProperty(element) && !element.includes('?')) {
            return false;
        }
    }
    return true;
}

function generateID() {
    return parseInt(Math.random() * 1000000000);
}

module.exports = {
    validateDTO,
    generateID,
};
