/* DTO - data transfer object
* Checks if user-input data matches the expected properties.
* */
function validateDTO(reqBody, properties) {
  const objectKeys = Object.keys(reqBody);

  /**
   * Array properties contains all the properties that are allowed to make change in pet data. Properties that contain '?'
   * are not required. Array objectKeys has to contain all the required properties, or else the input data is invalid.
   */
  for (const element of properties) {
    if (objectKeys.indexOf(element) === -1 && !element.includes("?")) { //if the element does not exist and does not contain '?'
      return false;
    }
  }

  /**
   * Checking if request body contains any fields that are not expected. Returns error if it does.
   */
  const flattened = properties.map(value => value.replace("?", ""));

  for (const property of objectKeys) {
    if (flattened.indexOf(property) === -1) {
      return false;
    }
  }

  return true;
}

function generateID() {
  return Math.random() * 1000000000;
}

module.exports = {
  validateDTO,
  generateID
};
