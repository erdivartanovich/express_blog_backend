//load env config
require('dotenv').load();

const process = require('process');
const Knex = require('knex');
const db = connect();

function connect () {
  const env = process.env.NODE_ENV;

  // [START connect]
  const configDev = {
    host: 'localhost',
    user: 'postgres',
    password: '0b0rg0bl0k',
    database: 'magguru'
  };

  const configProd = {
    host: '/cloudsql/magguru-net:us-central1:pg-magguru-net-backdoor',
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };

  if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
    configProd.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    connection: env==='production' ? configProd : configDev,
  });
  // [END connect]

  return knex;
}

module.exports = db;