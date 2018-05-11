/* DTO - data transfer object
* Checks if user-input data matches the expected properties.
* */
function validateDTO(reqBody, properties) {
  const requestProperties = Object.keys(reqBody);

  for (const property of requestProperties) {
    if (properties.indexOf(property) === -1 && !property.includes("?")) {
      return false;
    }
  }

  for (const element of properties) {
    if (requestProperties.indexOf(element) === -1 && !element.includes("?")) {
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
