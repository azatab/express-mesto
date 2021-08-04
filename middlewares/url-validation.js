const validator = require('validator');

const urlvalidator = (value, helpers) => {
  if (validator.isURL(value, { require_protocol: true })) {
    return value;
  }
  return helpers.message('Некорректный URL');
};

module.exports = urlvalidator;
