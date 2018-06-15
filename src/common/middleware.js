const { validateDTO } = require('./helper');

function validate(properties) {
  return function (req, res, next) {
    const validated = validateDTO(req.body, properties);
    (validated ? next() : res.status(400).json({ error: 'DTO is not valid' }));
  };
}

module.exports = {
  validate,
};
