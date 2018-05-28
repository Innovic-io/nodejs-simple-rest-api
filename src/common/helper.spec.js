const helper = require('./helper');
const assert = require('assert');

const petExample = {
  id: 1622147644,
  category: {
    id: 0,
    name: 'string',
  },
  name: 'Dog',
  photoUrls: [
    'string',
  ],
  tags: [
    {
      id: 0,
      name: 'string',
    },
  ],
  status: 'available',
};

const updatePet = {
  name: 'golden fish',
  status: 'available',
  owner: 'ivana',
};

const propertiesCreate = ['id?', 'category?', 'name', 'photoUrls?', 'tags?', 'status', 'examinations?'];
const propertiesUpdate = ['name?', 'status?', 'owner?'];

assert.equal(helper.validateDTO(petExample, propertiesCreate), true);

assert.equal(helper.validateDTO(petExample, ['name', 'status', 'V']), false);

assert.equal(helper.validateDTO({ report: 'report' }, ['schedule']), false);

assert.equal(helper.validateDTO(petExample, propertiesUpdate), false);

assert.equal(helper.validateDTO(updatePet, propertiesUpdate), true);

assert.equal(helper.validateDTO({}, propertiesUpdate), false);
