const CustomAPI = require('./custom-api');
const Unauthenticated = require('./unauthenticated');
const Unauthorized = require('./unauthorized');
const NotFound = require('./not-found');
const BadRequest = require('./bad-request');
module.exports = {
  CustomAPI,
  Unauthenticated,
  Unauthorized,
  NotFound,
  BadRequest,
};
