const { NOT_AUTHORIZED_ERROR } = require('../constants/status');

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTHORIZED_ERROR;
  }
}

module.exports = NotAuthorizedError;
