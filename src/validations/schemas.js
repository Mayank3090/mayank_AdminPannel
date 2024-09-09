const { Joi } = require('celebrate');

const schemas = {
  signup: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
  createProject: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
    }),
  },
  updateProject: {
    body: Joi.object().keys({
      name: Joi.string(),
      description: Joi.string(),
    }),
  },
  createUser: {
    body: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('Admin', 'Manager', 'Employee').required(),
    }),
  },
  updateUser: {
    body: Joi.object().keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6),
      role: Joi.string().valid('Admin', 'Manager', 'Employee'),
    }),
  },
  assignManager: {
    body: Joi.object().keys({
      managerId: Joi.string().required(),
    }),
  },
  assignEmployee: {
    body: Joi.object().keys({
      employeeId: Joi.string().required(),
    }),
  },
};

module.exports = schemas;
