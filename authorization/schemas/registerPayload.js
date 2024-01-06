const { roles, verified } = require('../../config');

module.exports = {
  type: 'object',
  properties: {
    username: {
      type: 'string'
    },
    email: {
      type: 'string',
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
    },
    password: {
      type: 'string'
    },
    age: {
      type: 'number'
    },
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    role: {
      type: 'string',
      enum: Object.values(roles)
    },
    verified: {
      type: 'boolean',
      enum: Object.values(verified)
    }

  },
  required: [
    'username',
    'email',
    'password',
    'age',
    'firstName',
    'lastName'
  ],
  additionalProperties: false
};