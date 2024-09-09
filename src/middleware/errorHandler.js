
const { isCelebrateError } = require('celebrate');
const logger = require('../config/Logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body') || err.details.get('query') || err.details.get('params');
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input',
      details: errorBody.details.map(detail => detail.message),
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      details: err.errors.map(e => e.message),
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      status: 'error',
      message: 'Unique constraint error',
      details: err.errors.map(e => e.message),
    });
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

module.exports = errorHandler;

