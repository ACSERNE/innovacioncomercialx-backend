'use strict';
require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres',
    logging: false
  },
  docker: {
    url: process.env.DB_URL,
    dialect: 'postgres',
    logging: false
  }
};
