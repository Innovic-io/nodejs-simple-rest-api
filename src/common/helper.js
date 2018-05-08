
/* DTO - data transfer object
* Checks if user-input data matches the expected properties.
* */
function validateDTO(reqBody, properties) {
    for (let element of properties) {
      if (!reqBody.hasOwnProperty(element) && !element.includes('?')) {
        return false;
      }
    }
    const requestProperties = Object.keys(reqBody).map(value => value.concat('?'));
    for (let element of requestProperties) {
      if (!properties.find(value => value == element)) {
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
