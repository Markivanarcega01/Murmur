require('dotenv').config(); // Load env vars

module.exports = {
  development: {
    username: process.env.LOCAL_DB_USERNAME,
    password: process.env.LOCAL_DB_PASSWORD || null,
    database: process.env.LOCAL_DB_DATABASE,
    host: process.env.LOCAL_DB_HOST,
    dialect: process.env.LOCAL_DB_DIALECT,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME + '_test',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME + '_prod',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};

