require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
      client: "pg",
      connection: {
        database: process.env.DB_NAME,
      },
      migrations: {
        directory: "./db/migrations",
      },
      seeds: {
        directory: "./db/seeds",
      },
    },
    production: {
      client: "pg",
      connection: process.env.DB_URL,
      migrations: {
        directory: "./db/migrations",
      },
      seeds: {
        directory: "./db/seeds",
      },
    },
  };
