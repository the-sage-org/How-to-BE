import db from './query';

const createTable = `
    CREATE TABLE IF NOT EXISTS
      "users"(
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS
      "guides"(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        keywords VARCHAR(128) NOT NULL,
        neededItems VARCHAR(128) NOT NULL,
        steps VARCHAR(128) NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
      );
      `;

const dropTable = `DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS guides CASCADE;`;

const queries = `${dropTable}${createTable}`;

db.dbquery(queries);
