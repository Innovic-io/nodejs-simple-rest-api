/* DTO - data transfer object
* Checks if user-input data matches the expected properties.
* */

function validateDTO(reqBody, properties) {
  // check if object is not empty
  const objectKeys = Object.keys(reqBody);

  if (!objectKeys.length) {
    return false;
  }

  // check if required fields are passed
  const requiredFields = properties.filter(value => !value.includes('?'));

  for (const required of requiredFields) {
    if (objectKeys.indexOf(required) === -1) {
      return false;
    }
  }

  // Checking if request body contains any fields that are not expected. Returns error if it does.
  const allFields = properties.map(value => value.replace('?', ''));

  for (const property of objectKeys) {
    if (allFields.indexOf(property) === -1) {
      return false;
    }
  }

  return true;
}

function generateID() {
  return Math.round(Math.random() * 10000000000);
}

module.exports = {
  validateDTO,
  generateID,
};
