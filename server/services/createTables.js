import db from './query';

const createTable = `
    CREATE TABLE IF NOT EXISTS
      "users"(
        id SERIAL PRIMARY KEY,
        username VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL
      );`;

const dropTable = 'DROP TABLE IF EXISTS users CASCADE;';

const queries = `${dropTable}${createTable}`;

db.dbquery(queries);
