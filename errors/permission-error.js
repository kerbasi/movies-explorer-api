const { PERMISSION_ERROR } = require('../utils/constants');

class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = PERMISSION_ERROR;
  }
}

module.exports = PermissionError;
