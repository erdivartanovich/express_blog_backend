// this file used by migration
//load env config
// require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database: 'magguru',
      user: 'postgres',
      password: '0b0rg0bl0k'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '/cloudsql/magguru-net:us-central1:pg-magguru-net-backdoor',
      database: 'magguru',
      user:     'postgres',
      password: '0b0rg0bl0k'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '/cloudsql/magguru-net:us-central1:pg-magguru-net-backdoor',
      database: 'magguru',
      user:     'postgres',
      password: '0b0rg0bl0k'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
