const { TOKEN_ERROR } = require('../utils/constants');

class TokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = TOKEN_ERROR;
  }
}

module.exports = TokenError;
