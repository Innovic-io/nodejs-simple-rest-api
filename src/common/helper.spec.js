const helper = require('./helper');
const assert = require('assert');

const petExample = {
  "id": 1622147644,
  "category": {
    "id": 0,
    "name": "string"
  },
  "name": "Dog",
  "photoUrls": [
    "string"
  ],
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "status": "available"
};

const properties = ["id?", "category?", "name", "photoUrls?", "tags?", "status", "examinations?"];

assert.equal(helper.validateDTO(petExample, properties), true);

assert.equal(helper.validateDTO(petExample, ["name", "status", "V"]), false);
